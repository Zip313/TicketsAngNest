import { Injectable } from '@nestjs/common';
import { OrderDto } from "../../dto/order.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Tour, TourDocument } from "../../schemas/Tour";
import { Model, Types } from "mongoose";
import { Order, OrderDocument } from "../../schemas/Order";
import { IOrder } from "../../models/IOrder";
import { JwtService } from "@nestjs/jwt";
// import ObjectId = module

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly jwtService: JwtService,
  ) {
  }
  getUserIdFromJwt(token:string):string{
    const decodedJwtAccessToken:any = this.jwtService.decode(token);
    return decodedJwtAccessToken._id;
  }
  async addOrder(orderData: OrderDto): Promise<IOrder> {
    return new this.orderModel(orderData).save();
  }

  async getOrders(userId:string): Promise<IOrder[]> {
    return this.orderModel.find({"userId":userId});
  }
}
