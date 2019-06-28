import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { AuthGuardService } from '../shared-services/auth-guard.service';

const routes: Routes = [
  { path: 'product', canActivate: [AuthGuardService], component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
