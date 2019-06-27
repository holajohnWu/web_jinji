import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsumableComponent } from './consumable.component';
import { AuthGuardService } from '../shared-services/auth-guard.service';

const routes: Routes = [
  { path: 'consumable', canActivate: [AuthGuardService], component: ConsumableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumableRoutingModule { }
