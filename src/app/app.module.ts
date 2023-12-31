import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuHeaderComponent } from './components/subComponents/header/menu-header.component';
import { SubHeaderMenu } from './components/subComponents/sub-header/sub-header.component';
import { MenuProductComponent } from './components/subComponents/menu-product/menu-product.component';
import { CategoryListComponent } from './components/subComponents/category-list/category-list.component';
import { HeaderMenuLeftComponent } from './components/subComponents/header-menu-left/header-menu-left';
import { HeaderMenuRinghtComponent } from './components/subComponents/header-menu-right/header-menu-right';
import { ProductsBoxRightComponent } from './components/subComponents/menu-product/products-box-right/products-box-right.component';
import { SearchCommandComponent } from './components/subComponents/search-command/search-command.component';
import { SearchNameComponent } from './components/subComponents/search-product/search-product.component';
import { BoxOrderComponent } from './components/subComponents/box-order/box-order.component';
import { MainComponent } from './components/Sales-command/main/main.component';
import { OrderComponent } from './components/subComponents/box-order/order/order.component'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { SummedUpComponent } from './components/search/sub-components/summed-up/summed-up.component';
import { DetailedComponent } from './components/search/sub-components/detailed/detailed.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuHeaderComponent,
    SubHeaderMenu,
    MenuProductComponent,
    CategoryListComponent,
    HeaderMenuLeftComponent,
    HeaderMenuRinghtComponent,
    ProductsBoxRightComponent,
    SearchCommandComponent,
    SearchNameComponent,
    BoxOrderComponent,
    MainComponent,
    OrderComponent,
    RegisterComponent,
    SearchComponent,
    SummedUpComponent,
    DetailedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
