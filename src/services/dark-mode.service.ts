import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  public darkMode: WritableSignal<boolean> = signal(true);

  toggleDarkMode() {
    this.darkMode.set(!this.darkMode());
  }
}
