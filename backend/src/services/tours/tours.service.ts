import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Tour, TourDocument } from "../../schemas/Tour";
import { Model, Types } from "mongoose";
import { TourDto } from "../../dto/tour.dto";
import { User } from "../../schemas/User";
import { ITour } from "../../models/ITour";
import { Expression } from "mongoose";
import { ITourClient } from "../../models/ITourClient";
import fs from "fs";

@Injectable()
export class ToursService {
  toursCount = 10;

  constructor(
    @InjectModel(Tour.name) private readonly tourModel: Model<TourDocument>
  ) {
  }

  async generateTours(): Promise<any> {
    let data = [];
    for (let i = 0; i <= this.toursCount; i++) {
      const img = `${i != 0 && i != 10 ? `pic${i}` : 'ocean'}.jpg`
      const tour = new TourDto(`test ${i}`, 'test desc', 'test operator', '5000', img, 'all', '11.05.2023');

      data.push(tour);
    }
    return this.tourModel.insertMany(data);
  }

  async deleteAllTours(): Promise<any> {
    return this.tourModel.deleteMany({});
  }

  async getAllTours(): Promise<ITour[]> {
    return this.tourModel.find({});
  }

  async getTourById(id: string): Promise<ITour> {
    return this.tourModel.findById(id);
  }

  async uploadTour(data: ITourClient):Promise<TourDto> {
    const tour = new TourDto(data.name, data.description, data.tourOperator, data.price, data.img, 'all', new Date().toDateString());
    const tourDto = await new this.tourModel(tour).save();
    return tourDto;

  }

  async getToursByName(name:string): Promise<ITour[]> {
    return this.tourModel.find({name: { "$regex": name, "$options": "i" }})
  }
}
