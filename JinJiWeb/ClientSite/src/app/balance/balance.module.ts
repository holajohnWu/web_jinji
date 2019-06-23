import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalanceRoutingModule } from './balance-routing.module';
import { BalanceComponent } from './balance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BalanceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BalanceRoutingModule
  ]
})
export class BalanceModule { }
