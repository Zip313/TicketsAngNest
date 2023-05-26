import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ToursService } from "../../services/tours/tours.service";
import { OrdersService } from "../../services/orders/orders.service";
import { OrderDto } from "../../dto/order.dto";
import { JwtAuthGuard } from "../../services/authentication/jwt-auth/jwt-auth.guard";
import { IOrder } from "../../models/IOrder";
import { JwtService } from "@nestjs/jwt";

@Controller('orders')
export class OrdersController {

  constructor(
    private readonly ordersService: OrdersService,

  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOrders(@Req() req:any):Promise<IOrder[]>{
    const token = req.get('Authorization').replace('Bearer', '').trim();
   const userId = this.ordersService.getUserIdFromJwt(token)
    return this.ordersService.getOrders(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  addOrder(@Body() data: OrderDto):void {
    console.log(data);
    const orderData = new OrderDto(data.age, data.userId, data.tourId, data.cardNumber, data.birthDay);
    this.ordersService.addOrder(orderData);
  }
}
