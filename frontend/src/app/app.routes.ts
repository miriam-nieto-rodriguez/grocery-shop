import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    {path:"", redirectTo: "home", pathMatch: "full"},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "home", component: HomeComponent},
    {path: "product-detail/:id", component: ProductDetailComponent},
    {path: "cart", component: CartComponent},
    {path: "checkout", component: CheckoutComponent, canActivate: [authGuard]},
    {path: "profile", component: ProfileComponent},
    {path: "**", redirectTo: "home"}
];
