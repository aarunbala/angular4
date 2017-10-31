import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';

@Component({
  selector: 'pm-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  pageTitle: string = 'Product Details';
  product: IProduct;
  constructor(private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    // tslint:disable-next-line:prefer-const
    let id = +this._route.snapshot.paramMap.get('id');
    this.pageTitle +=  `:${id}`;
    this.product = {
      'productId': id,
      'productName': 'Saw',
      'productCode': 'TBX-0022',
      'releaseDate': 'May 15, 2016',
      'description': '15-inch steel blade hand saw',
      'price': 11.55,
      'starRating': 3.7,
      'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png'
    };
  }

  onBack(): void {
    this._router.navigate(['/products']);
  }

}
