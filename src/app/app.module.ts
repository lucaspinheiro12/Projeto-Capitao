import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuHeaderComponent } from './components/header/menu-header.component';
import { SubHeaderMenu } from './components/Sales-command/main/sub-components/sub-header/sub-header.component';
import { MenuProductComponent } from './components/Sales-command/main/sub-components/menu-product/menu-product.component';
import { CategoryListComponent } from './components/Sales-command/main/sub-components/sub-header/sub-components/category-list/category-list.component';
import { HeaderMenuLeftComponent } from './components/header/sub-components/header-menu-left/header-menu-left';
import { ProductsBoxRightComponent } from './components/Sales-command/main/sub-components/menu-product/products-box-right/products-box-right.component';
import { SearchCommandComponent } from './components/Sales-command/main/sub-components/sub-header/sub-components/search-command/search-command.component';
import { SearchNameComponent } from './components/header/sub-components/search-product/search-product.component';
import { MainComponent } from './components/Sales-command/main/main.component';
import { OrderComponent } from './components/Sales-command/main/sub-components/box-order/order/order.component'
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { SummedUpComponent } from './components/search/sub-components/summed-up/summed-up.component';
import { DetailedComponent } from './components/search/sub-components/detailed/detailed.component';
import { BoxOrderComponent } from './components/Sales-command/main/sub-components/box-order/box-order.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuHeaderComponent,
    SubHeaderMenu,
    MenuProductComponent,
    CategoryListComponent,
    HeaderMenuLeftComponent,
    ProductsBoxRightComponent,
    SearchCommandComponent,
    SearchNameComponent,
    MainComponent,
    OrderComponent,
    RegisterComponent,
    SearchComponent,
    SummedUpComponent,
    DetailedComponent,
    BoxOrderComponent,
  ],  
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
