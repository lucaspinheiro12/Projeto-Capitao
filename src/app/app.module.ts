import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuHeaderComponent } from './components/header/menu-header.component';
import { SearchNameComponent } from './components/subComponents/search-name/search-name.component';
import { SearchCommandComponent } from './components/subComponents/search-command/search-command.component';
import { BoxProductComponent } from './components/subComponents/header-menu-left/header-menu-left';
import { RequestConciseComponent } from './components/subComponents/request-concise/request-concise.component';
import { ProductsBoxRightComponent } from './components/subComponents/products-box-right/products-box-right.component';
import { ComponentHeaderMenuRinght } from './components/subComponents/header-menu-right/header-menu-right';
import { SubHeaderMenu } from './components/sub-header/sub-header.component'

@NgModule({
  declarations: [
    AppComponent,
    SubHeaderMenu,
    MenuHeaderComponent,
    SearchNameComponent,
    SearchCommandComponent,
    BoxProductComponent,
    RequestConciseComponent,
    ProductsBoxRightComponent,
    ComponentHeaderMenuRinght
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
