import { Component, OnInit } from '@angular/core';
import { IItem } from './Item';
import { ItemListService } from './item-list.service';

@Component({
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  pageTitle: string = 'Purchase History';
  errorMsg: string;
  itemList: IItem[];
  filteredItemList: IItem[];
  _listFilter: string;
  totalPrice: number;

  constructor(private _itemService: ItemListService) { }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredItemList = this.listFilter ? this.performFilter(value) : this.itemList;
    this.calculateTotal(this.filteredItemList);
  }

  performFilter(value: string): IItem[] {
    value = value.toLocaleLowerCase();
    return this.itemList.filter( (item: IItem) => (
      item.product.toLocaleLowerCase().indexOf(value) !== -1 ||
      item.description.toLocaleLowerCase().indexOf(value) !== -1 ||
      item.category.toLocaleLowerCase().indexOf(value) !== -1
    ));
  }
  remove(item: IItem) {
    this.itemList = this.itemList.filter(items => items.id !== item.id);
    this.filteredItemList = this.itemList;
    this.calculateTotal(this.filteredItemList);
  }

  private callFn(item: IItem) {
    console.log('Item Clicked : ' + JSON.stringify(item));
  }

  calculateTotal(list: IItem[]) {
    let tp = 0;
    list.forEach(item => {tp = tp + item.price;
      console.log(tp); });
    this.totalPrice = tp;
  }
  ngOnInit() {
    this._itemService.getItems().subscribe(items => {
      this.itemList = items;
      this.filteredItemList = items;
      this.calculateTotal(this.filteredItemList);
    }, error => this.errorMsg = <any> error);

    //  this._itemService.getTotalPrice().subscribe( price => this.totalPrice = price, error => this.errorMsg = <any>error );
  }

}
