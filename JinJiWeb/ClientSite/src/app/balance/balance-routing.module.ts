import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalanceComponent } from './balance.component';
import { AuthGuardService } from '../shared-services/auth-guard.service';

const routes: Routes = [
  { path: 'balance', canActivate: [AuthGuardService], component: BalanceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalanceRoutingModule { }
