import { Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ToursService } from "../../services/tours/tours.service";
import { JwtAuthGuard } from "../../services/authentication/jwt-auth/jwt-auth.guard";
import { ITour } from "../../models/ITour";

@Controller('tours')
export class ToursController {

  constructor(private readonly toursService: ToursService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTours(): Promise<ITour[]> {
    return this.toursService.getAllTours();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTourById(@Param('id') id): Promise<ITour> {
    console.log('this');
    return this.toursService.getTourById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('ToursByName/:name')
  async getToursByName(@Param('name') name): Promise<ITour[]> {
    console.log('this');
    return this.toursService.getToursByName(name);
  }


  @UseGuards(JwtAuthGuard)
  @Post()
  async generateTours(): Promise<any> {
    return this.toursService.generateTours();
  }
  @UseGuards(JwtAuthGuard)
  @Delete(":remove")
  async removeAllTours(@Param('remove') remove): Promise<any> {
    return this.toursService.deleteAllTours();
  }
}
