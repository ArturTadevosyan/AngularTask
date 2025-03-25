import {Component, Input} from '@angular/core';
import {BankAccount} from '../../services/api/model/bank-account.model';
import {NgIf} from '@angular/common';
import {MaskTextDirective} from '../../shared/mask-text/mask-text.directive';

@Component({
  selector: 'app-card',
  imports: [
    NgIf,
    MaskTextDirective
  ],
  templateUrl: './bank-account-item.component.html',
  styleUrl: './bank-account-item.component.scss',
  standalone: true,
})
export class BankAccountItemComponent {
  @Input() bankAccount?: BankAccount;

  maskText(event: Event, textElement: HTMLElement) {
    textElement.click();
  }
}
