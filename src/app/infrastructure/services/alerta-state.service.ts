import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertaStateService {
  private alertaTitleSubject = new BehaviorSubject<string>('');
  alertaTitle$ = this.alertaTitleSubject.asObservable();

  setAlertaTitle(title: string) {
    this.alertaTitleSubject.next(title);
  }

  getAlertaTitle() {
    return this.alertaTitleSubject.value;
  }
}