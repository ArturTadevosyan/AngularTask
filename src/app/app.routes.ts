import {Routes} from '@angular/router';
import {SystemComponent} from './system/system.component';
import {LoginComponent} from './auth/login.component';
import {AuthGuard} from './guards/auth.guard';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'system', component: SystemComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login'},
];
