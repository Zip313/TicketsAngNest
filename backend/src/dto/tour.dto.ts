import { IUser } from "../models/IUser";
import { ITour } from "../models/ITour";
import * as stream from "stream";

export class TourDto implements ITour {
  id: string;
  name: string;
  description: string;
  tourOperator: string;
  price: string;
  img: string;
  type: string;
  date: string;

  constructor(name: string, description: string, tourOperator: string, price: string, img: string, type:string, date: string) {
    this.name = name;
    this.description = description;
    this.tourOperator = tourOperator;
    this.price = price;
    this.img = img;
    this.type = type;
    this.date = date;
  }
}