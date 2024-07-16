import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TableData } from '../models/table-data.interface';
import { ApiData } from '../models/api-data.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly _http = inject(HttpClient);

  getOrderData(): Observable<TableData[]> {
   return this._http.get<{data: ApiData[]}>('https://geeksoft.pl/assets/order-data.json').pipe(map(resp => {
      const group = resp.data.reduce((acc: any, curr) => {
        let key = curr.symbol;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(curr);
        return acc;
      }, {});

      const groups = Object.keys(group ).map(key => ({
        symbol: key,
        items: group[key],
      })).map(group => {
          return {
            ...group,
            isExpanded: false,
            size: this.sumValues((group.items as ApiData[]).map(item => item.size)),
            openPrice: this.getOpenPriceValue(group.items),
            swap: this.sumValues((group.items as ApiData[]).map(item => item.swap)),
            profit: this.getProfitAverage(group.items),
            items: (group.items as ApiData[]).map(singleItem => {
              return {
                ...singleItem,
                profit: this.getProfitValue(singleItem)
              }
            })
          }
      })
    return groups
    }));
  }

  getOpenPriceValue(items: ApiData[]): number {
    return items.reduce((acc, c) => acc + c.openPrice, 0) / items.length;
  }

  getProfitAverage(items: ApiData[]): number {
    return items.reduce((acc, c) => acc + this.getProfitValue(c), 0) / items.length;
  }
  getProfitValue(item: ApiData): number {
    let multiplier: number;
      switch (item.symbol) {
        case 'BTCUSD':
          multiplier = Math.pow(10, 2);
          break;
        case 'ETHUSD':
          multiplier = Math.pow(10, 3);
          break;
        case 'TTWO.US':
          multiplier = Math.pow(10, 1);
          break;
        default:
          multiplier = 1;
      }
    return (item.closePrice - item.openPrice) * multiplier * (item.side === 'BUY' ? 1 : -1) / 100;
  }

  sumValues(items: number[]): number {
    return items.reduce((acc, c) => acc + c, 0);
  }
}
