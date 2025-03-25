import {BankAccount} from './bank-account.model';
import {UserData} from './user-data.model';
import {UserTransaction} from './user-transaction.model';

export class UserInformation {
  id?: number;
  username?: string;
  password?: string;
  bankAccounts?: BankAccount[] = [];
  userData?: UserData;
  description?: string;
  transactions?: UserTransaction[] = [];
}
