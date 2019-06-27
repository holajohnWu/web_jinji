import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { AuthGuardService } from '../shared-services/auth-guard.service';

const routes: Routes = [
  { path: 'order', canActivate: [AuthGuardService], component: OrderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
