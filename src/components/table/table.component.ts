import { Component, inject } from '@angular/core';
import { ApiData } from '../../models/api-data.interface';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { TableData } from '../../models/table-data.interface';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DarkModeService } from '../../services/dark-mode.service';
import {MatIconModule} from '@angular/material/icon';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  private readonly _apiService = inject(ApiService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _darkModeService = inject(DarkModeService);

  darkMode = this._darkModeService.darkMode();
  $data: Observable<TableData[]> = this._apiService.getOrderData();

  headers = ['Symbol', 'Order ID', 'Side', 'Size', 'Open Time', 'Open Price', 'Swap', 'Profit', ''];

  onRemoveItems(items: ApiData[]): void {
    this._snackBar.open('Zamknięto zlecenie nr: ' + items.map(data => data.id),'X' ,{
      duration: 1000
    });
  }
}
