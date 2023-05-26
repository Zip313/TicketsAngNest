import {
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}

  @Get()
  @Redirect('http://localhost:3000/users/all', 301)
  getHello(msg: string): string {
    this.logger.log(this.appService.getHello());
    return this.appService.getHello() + msg;
  }
  @Post()
  post(): string {
    this.logger.log('post');
    return 'postData';
  }
  @Put()
  put(): string {
    this.logger.log('put');
    return 'put';
  }
  @Delete()
  delete(): string {
    this.logger.log('delete');
    return 'delete';
  }
}
