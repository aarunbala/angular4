import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from './shared/star.component';
import { ProductDetailsComponent } from './product/product-details.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { ProductGuardService } from './product/product-guard.service';
import { ItemListComponent } from './item/item-list.component';
import { ItemAddComponent } from './item/item-add.component';

@NgModule({
  declarations: [
    AppComponent, ProductListComponent, ConvertToSpacesPipe, StarComponent, ProductDetailsComponent, WelcomeComponent, ItemListComponent, ItemAddComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot([
      // tslint:disable-next-line:no-unused-expression
      { path: 'products', component: ProductListComponent },
      { path: 'items', component: ItemListComponent },
      { path: 'products/:id',
        canActivate: [ProductGuardService],
        component: ProductDetailsComponent },
      { path: 'welcome', component: WelcomeComponent},
      { path: '', redirectTo: 'welcome', pathMatch: 'full'},
      { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
  ])
  ],
  providers: [ProductGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
