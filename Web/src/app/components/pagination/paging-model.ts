
export interface IPagingModel<T> {
  number?: number;
  size?: number;
  orderBy?: string;
  orderDirection?: string;
  totalCount?: number;
  maxSize?: number;
  query?: T;
  list?: T[];
}


export class PagingModel<T> implements IPagingModel<T>{
  number = 1;
  size = 5;
  orderBy: string;
  orderDirection = 'ASC';
  totalCount: number;
  maxSize = 10;
  query?: T;
  list: T[] = new Array<T>();
}
