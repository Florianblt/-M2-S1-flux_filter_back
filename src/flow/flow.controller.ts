import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import {
    ApiResponse,
    ApiUseTags,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { Flow } from './flow.entity';
import { FlowService } from './flow.service';
import { NewFlow } from './newFlow.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../shared/guards/roles.guard';
import { UserRole } from '../user/user-role.enum';
import { Roles } from '../decorators/roles.decorator';

@ApiUseTags('flows')
@Controller('flows')
@ApiBearerAuth()
export class FlowController {
    constructor(private readonly flowService: FlowService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.User)
    @Roles(UserRole.Admin)
    @ApiResponse({
        status: 200,
        description: 'Return the list of all the flows.',
        type: Flow,
        isArray: true,
    })
    findAll(): Promise<Flow[]> {
        return this.flowService.findAll();
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
    findById(@Param('id') id: number){
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
    deleteByName(@Param('id') id: number){
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
