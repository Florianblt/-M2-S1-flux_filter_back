import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Delete,
  UseGuards,
  Put,
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
  @ApiImplicitQuery({
    name: 'sourceAppName',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'targetAppName',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Return the list of all the flows.',
    type: Array,
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
        : '',
      technologies: request.query.hasOwnProperty('technologies')
        ? request.query.technologies
        : '',
      sourceAppName: request.query.hasOwnProperty('sourceAppName')
        ? request.query.sourceAppName
        : '',
      targetAppName: request.query.hasOwnProperty('targetAppName')
        ? request.query.targetAppName
        : '',
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.User, UserRole.Admin)
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

  @Delete(':id')
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
  deleteById(@Param('id') id: number) {
    return this.flowService.deleteFlow(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Admin)
  @ApiResponse({
    status: 200,
    description: 'Update the flow',
  })
  @ApiResponse({
    status: 404,
    description: 'Flow not found',
  })
  updateById(@Param('id') id: number, @Body() newFlow: NewFlow) {
    return this.flowService.updateFlow(id, newFlow);
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
