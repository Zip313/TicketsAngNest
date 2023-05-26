import { IOrder } from "../models/IOrder";

export class OrderDto implements IOrder {
  age: string;
  birthDay: string;
  cardNumber: string;
  tourId: string;
  userId: string;
  _id?: string;

  constructor(age: string, userId:string, tourId: string, cardNumber:string, birthDay:string) {
    this.age = age;
    this.userId = userId;
    this.tourId = tourId;
    this.cardNumber = cardNumber;
    this.birthDay = birthDay;
  }

}