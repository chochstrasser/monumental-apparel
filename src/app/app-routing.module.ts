import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { AccountComponent } from './account/account.component';
import { AccountBagComponent } from './account-bag/account-bag.component';
import { AccountOrdersComponent } from './account-orders/account-orders.component';
import { RegisterComponent } from './register/register.component';
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';

const routes: Routes = [
  { path: 'account/register', component: RegisterComponent },
  {
    path: 'account/bag',
    component: AccountBagComponent,
  },
  {
    path: 'account/orders',
    component: AccountOrdersComponent,
    canActivate: [AuthGuard],
  },
  { path: 'account/settings', component: AccountComponent },
  { path: 'product/:product', component: ProductComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'cancel', component: CancelComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
