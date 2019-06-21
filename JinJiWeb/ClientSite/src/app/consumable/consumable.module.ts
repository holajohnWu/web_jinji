import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumableRoutingModule } from './consumable-routing.module';
import { ConsumableComponent } from './consumable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ConsumableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConsumableRoutingModule
  ]
})
export class ConsumableModule { }
