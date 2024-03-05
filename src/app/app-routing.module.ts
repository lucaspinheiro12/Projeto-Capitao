import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/Sales-command/main/main.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login-component/login-component.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: 'register', component: RegisterComponent, pathMatch: 'prefix', canActivate: [AuthGuard] },
  { path: 'sales', component: MainComponent, pathMatch: 'prefix', canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, pathMatch: 'prefix', canActivate: [AuthGuard] },
  { path: '', component: LoginComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
