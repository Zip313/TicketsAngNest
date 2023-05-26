import { Component, OnInit } from '@angular/core';
import {IOrder} from "../../../models/IOrder";
import {OrdersService} from "../../../services/orders/orders.service";

@Component({
  selector: 'app-orders',
  template: `
    <div>
      <div *ngFor="let order of orders;">
        <app-orders-item [order]="order"></app-orders-item>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class OrdersComponent implements OnInit {
  orders:IOrder[] =[];
  constructor(
    private readonly ordersService:OrdersService
  ) { }

  ngOnInit(): void {
    this.ordersService.getOrders()
      .subscribe((data)=>{
        this.orders=data
      });
  }

}
