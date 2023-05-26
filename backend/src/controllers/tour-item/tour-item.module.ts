import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { Tour, TourSchema } from "../../schemas/Tour";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "../../config/jwt.config";
import { ToursService } from "../../services/tours/tours.service";
import { JwtStrategy } from "../../services/authentication/jwt-strategy/jwt-strategy";
import { TourItemController } from "./tour-item.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema} ]),
    PassportModule,
    JwtModule.registerAsync(jwtConfig)

  ],
  controllers: [TourItemController],
  providers: [ToursService, JwtStrategy],
})
export class TourItemModule {}
