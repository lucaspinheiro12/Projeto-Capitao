import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuHeaderComponent } from './components/menu-header/menu-header.component';
import { SearchNameComponent } from './components/search-name/search-name.component';
import { SearchCommandComponent } from './components/search-command/search-command.component';
import { BoxProductComponent } from './components/box-product/box-product.component';
import { RequestConciseComponent } from './components/request-concise/request-concise.component';
import { ProductsBoxRightComponent } from './components/products-box-right/products-box-right.component';
import { ComponentBoxComponent } from './components/component-box/component-box.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { RightMenuComponent } from './components/right-menu/right-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuHeaderComponent,
    SearchNameComponent,
    SearchCommandComponent,
    BoxProductComponent,
    RequestConciseComponent,
    ProductsBoxRightComponent,
    ComponentBoxComponent,
    LeftMenuComponent,
    RightMenuComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
