import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { AccountBagComponent } from './account-bag/account-bag.component';
import { AccountOrdersComponent } from './account-orders/account-orders.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  { path: 'account/bag', component: AccountBagComponent },
  { path: 'account/orders', component: AccountOrdersComponent },
  { path: 'account/settings', component: AccountComponent },
  { path: 'product/:product', component: ProductDetailComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
