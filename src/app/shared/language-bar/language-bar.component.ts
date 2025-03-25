import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-language-bar',
  imports: [
    NgIf
  ],
  templateUrl: './language-bar.component.html',
  styleUrls: ['./language-bar.component.scss'],
  standalone: true,
})
export class LanguageBarComponent implements OnInit {
  currentLang = '';

  constructor(public translate: TranslateService) {
  }

  ngOnInit() {
    this.currentLang = this.translate.getDefaultLang();
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
  }

}
