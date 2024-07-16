import { Component, DestroyRef, effect, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from "../table/table.component";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DarkModeService } from '../../services/dark-mode.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent, MatSlideToggleModule, CommonModule ,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly _darkModeService = inject(DarkModeService);
  protected isDarkMode!: boolean

  constructor(){
    effect(() => {
      this.isDarkMode = this._darkModeService.darkMode();
      this._darkModeService.darkMode() ? document.body.classList.add('dark') : document.body.classList.remove('dark')
    })
  }

  onToggleDarkMode() {
    this._darkModeService.toggleDarkMode();
  }
}
