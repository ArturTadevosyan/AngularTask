import {Component, OnDestroy, OnInit} from '@angular/core';
import {SystemHeaderComponent} from './header/system-header.component';
import {SystemApiService} from '../services/api/system/system-api.service';
import {UserInformation} from '../services/api/model/user-information.model';
import {NgIf} from '@angular/common';
import {BankAccountsComponent} from '../features/bank-accounts/bank-accounts.component';
import {FormsModule} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';
import {TranslatePipe} from '@ngx-translate/core';
import {AuthService} from '../services/authentication/auth.service';

@Component({
  selector: 'app-system',
  imports: [
    SystemHeaderComponent,
    BankAccountsComponent,
    FormsModule,
    NgIf,
    TranslatePipe
  ],
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
  standalone: true,
})
export class SystemComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  userInfo: UserInformation = new UserInformation();
  isInputFocused = false;
  searchText = '';

  constructor(private systemApiService: SystemApiService,
              private authSerVice: AuthService) {
  }

  ngOnInit(): void {
    if (this.authSerVice.isLoggedIn()) {

    }

    this.systemApiService.getSystemData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response) => {
          this.userInfo.userData = response.userData;
          this.userInfo.bankAccounts = response.bankAccounts;
          this.userInfo.description = response.additionalData;
          this.userInfo.transactions = response?.transactions;
        }
      )
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
