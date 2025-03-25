import {Injectable} from '@angular/core';
import {catchError, combineLatest, map, Observable, of} from 'rxjs';
import {BankAccount} from '../model/bank-account.model';
import {UserData} from '../model/user-data.model';
import {RequestService} from '../../requestHelper/request.service';

@Injectable({
  providedIn: 'root'
})
export class SystemApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private requestService: RequestService) {
  }

  getSystemData(): Observable<{
    userData: UserData | undefined;
    bankAccounts: BankAccount[];
    additionalData: string;
    transactions: any[];
  }> {
    return combineLatest({
      userData: this.getUserData(),
      bankAccounts: this.getBankAccount(),
      additionalData: this.getAdditionalData(),
      transactions: this.getTransactions()
    });
  }

  getUserData() {
    return this.requestService.get(`${this.baseUrl}/getUserData`).pipe(
      map((response) => response.result as UserData),
      catchError((error) => {
        console.error('Error fetching user data', error);
        return of(undefined);
      })
    );
  }

  getBankAccount() {
    return this.requestService.get(`${this.baseUrl}/getBankAccounts`).pipe(
      map((response) => response.result as BankAccount[]),
      catchError((error) => {
        console.error('Error fetching bank accounts', error);
        return of([]);
      })
    );
  }

  getAdditionalData() {
    return this.requestService.get(`${this.baseUrl}/getAdditionalData`).pipe(
      map((response) => response.result.description),
      catchError((error) => {
        console.error('Error fetching additional data', error);
        return of('No additional data available');
      })
    );
  }

  getTransactions() {
    return this.requestService.get(`${this.baseUrl}/getTransactions`).pipe(
      catchError((error) => {
        console.error('Error fetching transactions', error);
        return of([]);
      })
    );
  }
}
