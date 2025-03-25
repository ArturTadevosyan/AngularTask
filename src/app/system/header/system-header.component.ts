import {Component, ElementRef, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../../services/authentication/auth.service';
import {LanguageBarComponent} from '../../shared/language-bar/language-bar.component';
import {SearchComponent} from '../../shared/search/search.component';
import {UserData} from '../../services/api/model/user-data.model';

@Component({
  selector: 'app-system-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageBarComponent, SearchComponent],
  templateUrl: './system-header.component.html',
  styleUrls: ['./system-header.component.scss']
})
export class SystemHeaderComponent implements OnInit, OnDestroy {
  @Input() userData?: UserData;
  isMobile: boolean = false;
  isMenuOpen: boolean = false;

  isLoggedIn: boolean = false;
  displayMoreInfoPopup: boolean = false;
  selectedCompanyIndex: number | null = null;
  mockPersonsCompanyInfo = [
    {name: '‘’Company’’ LLC', position: 'Owner'},
    {name: '‘’Company’’ 2', position: 'Executive director'},
    {name: '‘’Company’’ 2', position: 'Manager'},
    {name: '‘’Company’’ 2', position: 'Owner'}
  ];

  constructor(private authService: AuthService,
              private router: Router,
              private eRef: ElementRef) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  }

  onLogOut() {
    this.isLoggedIn = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openPersonMoreInfoPopup() {
    this.displayMoreInfoPopup = !this.displayMoreInfoPopup;
  }

  closePersonMoreInfoPopup() {
    this.displayMoreInfoPopup = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.displayMoreInfoPopup && !this.eRef.nativeElement.contains(event.target)) {
      this.closePersonMoreInfoPopup();
    }
  }

  chooseCompany(index: number) {
    this.selectedCompanyIndex = index;
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
  }

}
