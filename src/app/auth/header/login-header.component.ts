import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LanguageBarComponent} from '../../shared/language-bar/language-bar.component';

@Component({
  selector: 'app-login-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageBarComponent],
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss']
})
export class LoginHeaderComponent {

}
