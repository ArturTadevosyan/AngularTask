import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appToggleVisibility]',
  standalone: true,
})
export class MaskTextDirective implements OnInit {
  @Input('appToggleVisibility') originalText: string = '';
  @Input() maskChar: string = '*';
  @Input() maskLength: number = 6;
  private isMasked: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    if (this.originalText) {
      this.toggleMask();
    }
  }

  @HostListener('click') onClick() {
    this.isMasked = !this.isMasked;
    this.toggleMask();
  }

  private toggleMask() {
    const maskedText = this.createFixedMask();
    const textToShow = this.isMasked ? maskedText : this.originalText;

    if (this.isMasked) {
      if (this.maskChar === '*') {
        this.renderer.setStyle(this.el.nativeElement, 'letter-spacing', '3px');
        this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', '-6px');
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'letter-spacing', '6px');
        this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', '6px');
      }
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'letter-spacing', '0px');
      this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', '0px');
    }
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', textToShow);
  }

  private createFixedMask(): string {
    if (this.originalText) {
      return this.maskChar.repeat(this.maskLength);
    }
    return '';
  }
}
