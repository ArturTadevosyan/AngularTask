import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(
    private http: HttpClient,
  ) {
  }

  get(url: string, options?: any): Observable<any> {
    const headers = {};
    return this.http.get(
      url,
      Object.assign(
        {
          headers: headers,
        },
        options,
      ),
    );
  }

  post(url: string, body?: any, options?: any): Observable<any> {
    const headers = {};
    return this.http.post(
      url,
      body,
      Object.assign(
        {
          headers: headers,
        },
        options,
      ),
    );
  }

  patch(url: string, body: any, options?: any): Observable<any> {
    const headers = {}
    return this.http.patch(
      url,
      body,
      Object.assign(
        {
          headers: headers,
        },
        options,
      ),
    );
  }

  put(url: string, body: any, options?: any): Observable<any> {
    const headers = {};
    return this.http.put(
      url,
      body,
      Object.assign(
        {
          headers: headers,
        },
        options,
      ),
    );
  }

  remove(url: string, options?: any): Observable<any> {
    const headers = {}
    return this.http.delete(
      url,
      Object.assign(
        {
          headers: headers,
        },
        options,
      ),
    );
  }

}
