import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LoaderService} from './services/loader/loader.service';
import {Subscription} from 'rxjs';
import {LoaderComponent} from './shared/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent {
  title = 'AngularTask';
  private subscription?: Subscription;
  showProgressBar = false;

  constructor(private translate: TranslateService,
              private loaderService: LoaderService) {
    this.translate.addLangs(['hy', 'ru', 'en']);
    this.translate.setDefaultLang('en');
    this.subscription = this.loaderService.isVisible$.subscribe(isVisible => {
      this.showProgressBar = isVisible;
    });
  }
}
