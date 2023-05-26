import { Logger, Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "../../config/jwt.config";
import { JwtStrategy } from "../../services/authentication/jwt-strategy/jwt-strategy";
import { Order, OrderSchema } from "../../schemas/Order";
import { AuthGuard } from "../../services/authentication/auth/auth.guard";
import { OrdersService } from "../../services/orders/orders.service";

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    PassportModule,
    JwtModule.registerAsync(jwtConfig),
  ],
  controllers:[OrdersController],
  providers:[OrdersService,Logger,JwtStrategy]
})
export class OrdersModule {}
