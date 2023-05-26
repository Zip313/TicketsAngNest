import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { ToursService } from '../../services/tours/tours.service';
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "../../config/jwt.config";
import { JwtStrategy } from "../../services/authentication/jwt-strategy/jwt-strategy";
import { Tour, TourSchema } from "../../schemas/Tour";
import { AuthGuard } from "../../services/authentication/auth/auth.guard";
import { UsersService } from "../../services/users/users.service";
import { User, UserSchema } from "../../schemas/User";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema} ]),
    PassportModule,
    JwtModule.registerAsync(jwtConfig)

  ],
  controllers: [ToursController],
  providers: [ToursService, JwtStrategy],
})
export class ToursModule {}
