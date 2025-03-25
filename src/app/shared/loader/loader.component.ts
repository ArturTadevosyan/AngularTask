import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LoaderService} from '../../services/loader/loader.service';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf
  ]
})
export class LoaderComponent implements OnInit {
  isVisible$!: Observable<boolean>;

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.isVisible$ = this.loaderService.isVisible$;
  }
}
