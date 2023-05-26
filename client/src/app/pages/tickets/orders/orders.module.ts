import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrdersComponent} from "./orders.component";
import {OrdersItemComponent} from "./orders-item/orders-item.component";
import {OrdersService} from "../../../services/orders/orders.service";
import {OrdersRoutingModule} from "./orders-routing.module";



@NgModule({
  declarations:[
    OrdersComponent,
    OrdersItemComponent,

  ],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ],
  providers:[
    OrdersService
  ]
})
export class OrdersModule { }
