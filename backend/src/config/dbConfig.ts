import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";
import { appConfig } from "./app.config";

export const dbConfig:MongooseModuleAsyncOptions = {
  useFactory: () => {
    return {
      uri: appConfig().appConnectionString,
    }
}
};