import {HttpEvent, HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {LoaderService} from '../services/loader/loader.service';
import {tap} from 'rxjs';
import {inject} from '@angular/core';
import {AuthService} from '../services/authentication/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  const authService = inject(AuthService);

  loaderService.show();

  const token = localStorage.getItem('authToken');
  const modifiedReq = token
    ? req.clone({setHeaders: {Authorization: token}})
    : req;

  return next(modifiedReq).pipe(
    tap(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          loaderService.hide();
        }
      },
      error => {
        loaderService.hide();

        if (error.status === 403 && authService.getToken()) {
          authService.logout();
        }
      }
    )
  );
};
