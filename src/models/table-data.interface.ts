import { ApiData } from "./api-data.interface";

export interface TableData {
  symbol: string,
  items: ItemData[],
  isExpanded: boolean;
  profit: number,
  size: number,
        openPrice: number,
        swap: number
}

interface ItemData extends ApiData {
  profit: number
}
