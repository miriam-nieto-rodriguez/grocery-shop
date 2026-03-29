import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
    {path:"", redirectTo: "home", pathMatch: "full"},
    {path: "home", component: HomeComponent},
    {path: "product-detail", component: ProductDetailComponent},
    {path: "product-form", component: ProductFormComponent},
    {path: "cart", component: CartComponent},
    {path: "**", redirectTo: "home"}
];
