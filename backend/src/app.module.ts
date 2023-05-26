import {Logger, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './controllers/users/users.module';
import {MongooseModule} from "@nestjs/mongoose";
import { ToursController } from './controllers/tours/tours.controller';
import { ToursModule } from './controllers/tours/tours.module';
import { ToursService } from './services/tours/tours.service';
import { ConfigModule } from "@nestjs/config";
import { appConfig } from "./config/app.config";
import { dbConfig } from "./config/dbConfig";
import { OrdersController } from './controllers/orders/orders.controller';
import { OrdersModule } from './controllers/orders/orders.module';
import { OrdersService } from './services/orders/orders.service';
import { TourItemModule } from "./controllers/tour-item/tour-item.module";

@Module({
  imports:
      [
          ConfigModule.forRoot(),
          UsersModule,
          MongooseModule.forRootAsync( dbConfig),
          ToursModule,
          TourItemModule,
          OrdersModule,
      ],
  controllers: [AppController, ],
  providers: [AppService,Logger],
})
export class AppModule {}
