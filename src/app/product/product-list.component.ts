import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: 'product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

// tslint:disable-next-line:comment-format
//Chapter 8 - Passing data to a Nested Component

export class ProductListComponent implements OnInit  {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    _listFilter: string;
    errorMessage: string;
    filteredProducts: IProduct[];
    products: IProduct[] = [];

        constructor(private _productService: ProductService) {
        }

        get listFilter(): string {
            return this._listFilter;
        }

        set listFilter(value: string){
            this._listFilter = value;
            this.filteredProducts = this._listFilter ? this.performFiltering(value) : this.products;
        }

        performFiltering(filterBy: string): IProduct[] {
            filterBy = filterBy.toLocaleLowerCase();
            return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }

        toggleImage(): void {
            this.showImage = !this.showImage;
        }

        ngOnInit(): void {
           console.log('OnInit');
           this._productService.getProducts()
                                .subscribe(products => {
                                                            this.products = products;
                                                            this.filteredProducts = this.products;
                                                        },
                                            error => this.errorMessage = <any>error );
        }

        onRatingClicked(message: string): void {
            this.pageTitle = 'Product List: ' + message;
        }
}
