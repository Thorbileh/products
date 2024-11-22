import { Routes } from '@angular/router';
import { ProductCardsComponent } from './components/product-cards/product-cards.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LeftbarComponent } from './components/leftbar/leftbar.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


export const routes: Routes = [
    {path: 'products', component: ProductCardsComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent}, 
    {path: 'category/:category_name', component: LeftbarComponent}, 
    {path: 'products/:prod_id', component:ProductDetailComponent},
  
   
];
