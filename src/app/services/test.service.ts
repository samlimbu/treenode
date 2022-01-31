import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private messageSource = new Subject<any>();
  constructor() { }

  changeMessage(message: string|number) {
    this.messageSource.next(message);
  }
  getMessage() {
    return this.messageSource.asObservable();
  }
}
