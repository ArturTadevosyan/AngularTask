import {Component} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
})
export class SearchComponent {
  isInputFocused = false;
  searchText = '';
}
