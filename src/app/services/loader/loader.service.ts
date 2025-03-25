import {Injectable} from '@angular/core';
import {delay, map, of, scan, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private requestUpdates = new Subject<number>();

  private activeRequests = this.requestUpdates.pipe(
    scan((acc, value) => Math.max(0, acc + value), 0),
    map(count => count > 0),
  );

  isVisible$ = this.activeRequests;

  constructor() {
  }

  show() {
    this.requestUpdates.next(1);
  }

  hide() {
    // this.requestUpdates.next(-1);

    // for testing
    of(null).pipe(delay(1000)).subscribe(() => this.requestUpdates.next(-1));
  }
}
