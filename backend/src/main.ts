import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from "./config/app.config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useStaticAssets(join(__dirname, '..', 'public'), {prefix:'/public'})

  const config = new DocumentBuilder()
    .setTitle('Tour example')
    .setDescription('The Tours API description')
    .setVersion('1.0')
    .addTag('tours')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization, Charset',
    credentials: true,
  });
  const port = await appConfig().appPort;
  await app.listen(port);
  console.log(`app listening port ${port}`);

}
bootstrap();
