import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsumableComponent } from './consumable.component';

const routes: Routes = [
  { path: 'consumable', component: ConsumableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumableRoutingModule { }
