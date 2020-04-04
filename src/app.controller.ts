import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {ApiDefaultResponse} from "@nestjs/swagger";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): { message: string } {
        return this.appService.ping();
    }
}
