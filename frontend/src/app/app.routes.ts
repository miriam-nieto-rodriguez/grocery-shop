import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {path:"", redirectTo: "home", pathMatch: "full"},
    {path: "login", component: LoginComponent},
    {path: "home", component: HomeComponent},
    {path: "product-detail/:id", component: ProductDetailComponent},
    {path: "cart", component: CartComponent},
    {path: "checkout", component: CheckoutComponent},
    {path: "**", redirectTo: "home"}
];
