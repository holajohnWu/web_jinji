import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { ConsumableModule } from './consumable/consumable.module';
import { OrderModule } from './order/order.module';
import { BalanceModule } from './balance/balance.module';
import { HttpHeaderInterceptor } from './shared-utils/http-header.interceptor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ProductModule,
    ConsumableModule,
    OrderModule,
    BalanceModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
