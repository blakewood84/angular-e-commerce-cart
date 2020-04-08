import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  {
    path: 'product-display',
    component: ProductDisplayComponent,
    data: { title: 'List of Products' }
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: { title: 'Check Out Items' }
  },
  {
    path: 'product-details/:id',
    component: ProductComponent,
    data: { title: 'Product Detail' }
  },
  {
    path: 'your-cart',
    component: CartComponent,
    data: { title: 'Shopping Cart' }
  },
  {
    path: '',
    redirectTo: 'product-display',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
