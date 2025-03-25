import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CountryCodeModel} from '../services/api/model/country-code.model';
import {LoginApiService} from '../services/api/login/login-api.service';
import {AuthService} from '../services/authentication/auth.service';
import {LoginHeaderComponent} from './header/login-header.component';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {Subject, takeUntil} from 'rxjs';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    LoginHeaderComponent,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    NgStyle,
    TranslatePipe
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  countryCodes: CountryCodeModel[] = [];
  errorMessage = '';
  showPasswordField: boolean = false;
  loginForm: FormGroup = new FormGroup<any>({});
  selectedPhonePrefix: number = 374;
  displayCountryCodePopup: boolean = false;
  buttonText: string = 'Next';
  passwordInputType: string = 'password';

  constructor(
    private loginApi: LoginApiService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/system']);
    }
    this.getCountryCodes();
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup(
      {
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
        password: new FormControl(null, [Validators.required]),
      }
    )
  }

  getCountryCodes(): void {
    this.loginApi.getCountryCodes().subscribe({
      next: (data) => {
        this.countryCodes = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load country codes.';
      },
    });
  }

  handleSubmit(): void {
    this.errorMessage = '';
    if (!this.showPasswordField) {
      this.checkPhoneNumber();
    } else {
      this.onLogin();
    }
  }

  checkPhoneNumber() {
    let phoneNumber = this.loginForm.get('phoneNumber')?.value;
    let fullPhoneNumber = this.selectedPhonePrefix + phoneNumber;
    this.loginApi.checkPhoneNumber(fullPhoneNumber)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.showPasswordField = true;
          this.buttonText = 'Login';
          this.errorMessage = '';
        },
        error: () => {
          this.showPasswordField = false;
          this.loginForm.markAllAsTouched();
          this.errorMessage = 'Invalid phone number';
        }
      });
  }

  onLogin() {
    let phoneNumber = this.loginForm.get('phoneNumber')?.value;
    let fullPhoneNumber = this.selectedPhonePrefix + phoneNumber;
    let password = this.loginForm.get('password')?.value;

    this.loginApi.login(fullPhoneNumber, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
          next: (response) => {
            this.authService.saveToken(response.token);
            this.router.navigate(['/system']);
            this.errorMessage = '';
          },
          error: () => {
            this.loginForm.markAllAsTouched();
            this.errorMessage = 'Invalid phone number or Password';
          }
        }
      )

  }

  openCountryCodePopup() {
    this.displayCountryCodePopup = !this.displayCountryCodePopup;
  }

  closeCountryCodePopup() {
    this.displayCountryCodePopup = false;
  }

  selectCountryCode(countryCode: CountryCodeModel) {
    this.displayCountryCodePopup = false;
    this.selectedPhonePrefix = countryCode.countryCode || 374;
  }

  showPassword() {
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'password';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
