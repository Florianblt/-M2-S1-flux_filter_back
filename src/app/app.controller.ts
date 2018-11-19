import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiImplicitQuery } from '@nestjs/swagger';
import { AppService } from './app.service';
import { App } from './app.entity';
import { NewApp } from './newApp.dto';

@ApiUseTags('apps')
@Controller('apps')
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    @ApiResponse({
        status: 200,
        description: 'The list of all the apps.',
        type: App,
        isArray: true,
    })
    findAll(): Promise<App[]> {
        return this.appService.findAll();
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'Return one app',
        type: App,
        isArray: true,
    })
    @ApiResponse({
        status: 404,
        description: 'Not found.',
    })
    findById(@Param('id') id: number) {
        return this.appService.findById(id);
    }

    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'Delete the app',
    })
    deleteByName(@Param('id') id: number) {
        return this.appService.deleteApp (id);
    }

    @Post()
    @ApiResponse({
        status: 201,
        description: 'The app has been created.',
        type: App,
    })
    saveNew(@Body() newApp: NewApp): Promise<App> {
        return this.appService.createApp(newApp);
    }
}
