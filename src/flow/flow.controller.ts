import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiUseTags,
  ApiBearerAuth,
  ApiImplicitQuery,
} from '@nestjs/swagger';
import { Flow } from './flow.entity';
import { FlowService } from './flow.service';
import { NewFlow } from './newFlow.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../shared/guards/roles.guard';
import { UserRole } from '../user/user-role.enum';
import { Roles } from '../decorators/roles.decorator';
import { Pagination } from './../pagination';

@ApiUseTags('flows')
@Controller('flows')
@ApiBearerAuth()
export class FlowController {
  constructor(private readonly flowService: FlowService) {}

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
  @ApiImplicitQuery({
    name: 'technologies',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Return the list of all the flows.',
    type: Flow,
    isArray: true,
  })
  async findAll(@Request() request): Promise<Pagination<Flow>> {
    return this.flowService.paginate({
      limit: request.query.hasOwnProperty('limit')
        ? request.query.limit
        : process.env.LIMIT,
      page: request.query.hasOwnProperty('page')
        ? request.query.page
        : process.env.PAGE,
      name: request.query.hasOwnProperty('name') ? request.query.name : '',
      description: request.query.hasOwnProperty('description')
        ? request.query.description
        : null,
      technologies: request.query.hasOwnProperty('technologies')
        ? request.query.technologies
        : null,
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.User)
  @Roles(UserRole.Admin)
  @ApiResponse({
    status: 200,
    description: 'Return one flow',
    type: Flow,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Flow not found',
  })
  findById(@Param('id') id: number) {
    return this.flowService.findById(id);
  }

  @Delete('id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Admin)
  @ApiResponse({
    status: 200,
    description: 'Delete the flow',
  })
  @ApiResponse({
    status: 404,
    description: 'Flow not found',
  })
  deleteByName(@Param('id') id: number) {
    return this.flowService.deleteFlow(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Admin)
  @ApiResponse({
    status: 201,
    description: 'The flow technology has been created.',
    type: Flow,
  })
  saveNew(@Body() newFlow: NewFlow): Promise<Flow> {
    return this.flowService.createFlow(newFlow);
  }
}
