import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { ToursService } from "../../services/tours/tours.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { ITourClient } from "../../models/ITourClient";
import { TourDto } from "../../dto/tour.dto";
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('tour-item')
export class TourItemController {
  static imgName:string;

  constructor(
    private readonly toursService: ToursService
  ) {}

  @Get('getImage/:imgName')
  getImage(@Param('imgName') imgName: string): StreamableFile {
    // res.sendFile(imgName, { root: './public/'}); , @Res() res: any
    const file = createReadStream(join(process.cwd(), `./public/${imgName}`));
    return new StreamableFile(file);
  }
  @Post()
  @UseInterceptors( FileInterceptor('img',{
    limits:{fileSize: 3000*1024}, //3мб

    storage: diskStorage({
      destination: './public/',
      filename:(req, file, callback) => {
        const imgType = file.mimetype.split('/')
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9);
        const imgName = file.fieldname + '-' + uniqueSuffix + '.' + imgType[1]

        TourItemController.imgName = imgName;

        callback(null,imgName);

      }
    })
  }))
  async initTours(@Body() body: ITourClient, @UploadedFile() file): Promise<TourDto> {
    console.log(body);
    console.log(file);
    body.img = TourItemController.imgName;
    return this.toursService.uploadTour(body);
  }



}
