import {Component, Input} from '@angular/core';
import {BankAccount} from '../../services/api/model/bank-account.model';
import {BankAccountItemComponent} from '../card/bank-account-item.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-bank-accounts',
  imports: [
    BankAccountItemComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './bank-accounts.component.html',
  styleUrl: './bank-accounts.component.scss',
  standalone: true,
})
export class BankAccountsComponent {

  @Input() bankAccounts?: BankAccount[];

}
