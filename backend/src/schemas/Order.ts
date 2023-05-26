import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IOrder } from "../models/IOrder";

export type OrderDocument = HydratedDocument<IOrder>;

@Schema()
export class Order implements IOrder {
  @Prop() age: string;

  @Prop() birthDay: string;
  @Prop() cardNumber: string;
  @Prop() tourId: string;
  @Prop() userId: string;
  // @Prop() _id: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);