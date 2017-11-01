import {Component} from '@angular/core';
import { ProductService } from './product/product.service';
import { ItemListService } from './item/item-list.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  providers: [ProductService, ItemListService]
})

export class AppComponent {
  pageTitle: string = 'Product Managment Tool';
}
