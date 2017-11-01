import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IItem } from './Item';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ItemListService {
  totalPriceUrl: string = 'http://localhost:8086/products/itemManager/getTotalPrice';
  itemUrl: string = 'http://localhost:8086/products/itemManager/getAllItems';

  constructor(private _http: HttpClient) { }

  getItems(): Observable<IItem[]> {
    return this._http.get<IItem[]>(this.itemUrl)
      .do(data => console.log('ItemList : ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }

  getTotalPrice(): Observable<number> {
    return this._http.get<number>(this.totalPriceUrl)
    .do(data => console.log('Total Price : ' + JSON.stringify(data)))
    .catch(this.handleError);
  }

}
