import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {CountryCodeModel} from '../model/country-code.model';
import {RequestService} from '../../requestHelper/request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private requestService: RequestService) {
  }

  getCountryCodes(): Observable<any[]> {
    return this.requestService.get(`${this.baseUrl}/GetCountryCode`).pipe(
      map(response => response.result as CountryCodeModel[])
    );
  }

  checkPhoneNumber(phone: string): Observable<any> {
    const body = {username: phone};
    return this.requestService.post(`${this.baseUrl}/checkPhone`, body);
  }

  login(phone: string, password: string): Observable<any> {
    const body = {username: phone, password};
    return this.requestService.post(`${this.baseUrl}/login`, body);
  }
}
