import { Injectable } from '@angular/core';
import {forkJoin, Observable} from "rxjs";
import {ITour} from "../../models/ITour";
import {IUser} from "../../models/IUser";
import {HttpClient} from "@angular/common/http";
import {UsersRestService} from "../rest/users-rest.service";
import {IOrder} from "../../models/IOrder";
import {TicketRestService} from "../rest/ticket-rest.service";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(

    private readonly usersRestService: UsersRestService,
    private readonly ticketRestService: TicketRestService,
  ) { }

  getOrders():Observable<IOrder[]>{
    return this.ticketRestService.getOrdersData();
  }
  getOrderInfo(userId:string,tourId:string): Observable<[IUser,ITour]>  {
    const fork = forkJoin(this.usersRestService.getUserById(userId),this.ticketRestService.getTicketById(tourId))
    return fork;
  }
}
