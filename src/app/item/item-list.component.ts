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
  _priceFilter: number;

  constructor(private _itemService: ItemListService) { }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredItemList = this.listFilter ? this.performFilter(this.listFilter, this.priceFilter) : this.itemList;
    this.calculateTotal(this.filteredItemList);
  }

  get priceFilter(): number {
    return this._priceFilter;
  }

  set priceFilter(value: number) {
    this._priceFilter = value; // Number.parseInt(value);
    console.log(this._priceFilter);
    this.filteredItemList = this._priceFilter ? this.performFilter(this.listFilter, this.priceFilter) : this.itemList;
    this.calculateTotal(this.filteredItemList);
  }

  performFilter(listFilter: string, price: number): IItem[] {
    console.log('Price Filter' + price);
    // tslint:disable-next-line:prefer-const
    let items: IItem[];
    if (listFilter && price) {
      listFilter = listFilter.toLocaleLowerCase();
      console.log('Inside both');
      return this.itemList.filter( (item: IItem) => (
        item.product.toLocaleLowerCase().indexOf(listFilter) !== -1 ||
        item.description.toLocaleLowerCase().indexOf(listFilter) !== -1 ||
        item.category.toLocaleLowerCase().indexOf(listFilter) !== -1 ||
        item.shop.toLocaleLowerCase().indexOf(listFilter) !== -1
      ) &&  ( item.price <= price));
    } else {
    if (listFilter) {
      console.log('Inside List');
      listFilter = listFilter.toLocaleLowerCase();
      return this.itemList.filter( (item: IItem) => (
        item.product.toLocaleLowerCase().indexOf(listFilter) !== -1 ||
        item.description.toLocaleLowerCase().indexOf(listFilter) !== -1 ||
        item.category.toLocaleLowerCase().indexOf(listFilter) !== -1 ||
        item.shop.toLocaleLowerCase().indexOf(listFilter) !== -1
      ));
    }
    if (price) {
      console.log('Inside Price');
      return this.itemList.filter( (item: IItem) => ( item.price <= price));
    }
  }
    return this.itemList;
  }

  remove(item: IItem) {
    this.itemList = this.itemList.filter(items => items.id !== item.id);
    this.filteredItemList = this.itemList;
    this.calculateTotal(this.filteredItemList);
  }

  calculateTotal(list: IItem[]) {
    let tp = 0;
    list.forEach(item => {tp = tp + item.price;});
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
