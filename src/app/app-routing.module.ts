import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/Sales-command/main/main.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path:'',component: RegisterComponent,pathMatch:'full'},
  {path:'sales', component:MainComponent,pathMatch:'prefix'},
  {path:'search',component:SearchComponent,pathMatch:'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
