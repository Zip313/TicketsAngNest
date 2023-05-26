import {Component, Input, OnInit} from '@angular/core';
import {IOrder} from "../../../../models/IOrder";
import {ITour} from "../../../../models/ITour";
import {IUser} from "../../../../models/IUser";
import {OrdersService} from "../../../../services/orders/orders.service";

@Component({
  selector: 'app-orders-item',
  template: `
    <div class="order-item"  >
      <div *ngIf="tour">
        <h3 class="order-title">tour:{{tour.name}}, price:{{tour.price}}</h3>
      </div>
      <div *ngIf="user">
        <h3 class="order-title">client:{{user.login}}</h3>
      </div>
      <h3 class="order-title" >orderId:{{order._id}}</h3>
    </div>
  `,
  styleUrls: [ './orders-item.scss'
  ]
})
export class OrdersItemComponent implements OnInit {
  @Input() order:IOrder;
  tour?:ITour;
  user?:IUser
  constructor(
    private readonly ordersService:OrdersService,
  ) { }

  ngOnInit(): void {
    if(this.order.tourId && this.order.userId){
      this.ordersService.getOrderInfo(this.order.userId,this.order.tourId).subscribe(([user,tour])=>{
        console.log(user,tour);
        this.user = user;
        this.tour = tour;
      })
    }

  }

}
