import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuHeaderComponent } from './components/header/menu-header.component';
import { CategoryListComponent } from './components/Sales-command/main/sub-components/category-list/category-list.component';
import { HeaderMenuLeftComponent } from './components/header/sub-components/header-menu-left/header-menu-left';
import { ProductsBoxRightComponent } from './components/Sales-command/main/sub-components/products-box-right/products-box-right.component';
import { SearchNameComponent } from './components/header/sub-components/search-product/search-product.component';
import { MainComponent } from './components/Sales-command/main/main.component';
import { OrderComponent } from './components/Sales-command/main/sub-components/carrinho/order/order.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { SummedUpComponent } from './components/search/sub-components/summed-up/summed-up.component';
import { DetailedComponent } from './components/search/sub-components/detailed/detailed.component';
import { CarrinhoComponent } from './components/Sales-command/main/sub-components/carrinho/carrinho.component';
import { LoginComponent } from './components/login-component/login-component.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    MenuHeaderComponent,
    CategoryListComponent,
    HeaderMenuLeftComponent,
    ProductsBoxRightComponent,
    SearchNameComponent,
    MainComponent,
    OrderComponent,
    RegisterComponent,
    SearchComponent,
    SummedUpComponent,
    DetailedComponent,
    CarrinhoComponent,
    LoginComponent
  ],  
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module,
    ReactiveFormsModule,
    NgxMaskDirective, NgxMaskPipe
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
