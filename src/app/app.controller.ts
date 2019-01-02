import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Request,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiResponse,
  ApiBearerAuth,
  ApiImplicitQuery,
  ApiImplicitParam,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { App } from './app.entity';
import { NewApp } from './newApp.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../shared/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import { Pagination } from './../pagination';

@ApiUseTags('apps')
@Controller('apps')
@ApiBearerAuth()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.User, UserRole.Admin)
  @ApiImplicitQuery({
    name: 'limit',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'page',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'name',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'description',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'The list of all the apps.',
    type: App,
    isArray: true,
  })
  async findAll(@Request() request): Promise<Pagination<App>> {
    return this.appService.paginate({
      limit: request.query.hasOwnProperty('limit')
        ? request.query.limit
        : process.env.LIMIT,
      page: request.query.hasOwnProperty('page')
        ? request.query.page
        : process.env.PAGE,
      name: request.query.hasOwnProperty('name') ? request.query.name : '',
      description: request.query.hasOwnProperty('description')
        ? request.query.description
        : '',
      technologies: request.query.hasOwnProperty('technologies')
        ? request.query.technologies
        : '',
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.User, UserRole.Admin)
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Admin)
  @ApiResponse({
    status: 200,
    description: 'Delete the app',
  })
  deleteByName(@Param('id') id: number) {
    return this.appService.deleteApp(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Admin)
  @ApiResponse({
    status: 201,
    description: 'The app has been created.',
    type: App,
  })
  saveNew(@Body() newApp: NewApp): Promise<App> {
    return this.appService.createApp(newApp);
  }
}
