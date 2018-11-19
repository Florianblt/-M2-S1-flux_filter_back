import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
} from '@nestjs/common';
import {
    ApiResponse,
    ApiUseTags,
} from '@nestjs/swagger';
import { Flow } from './flow.entity';
import { FlowService } from './flow.service';
import { NewFlow } from './newFlow.dto';

@ApiUseTags('flows')
@Controller('flows')
export class FlowController {
    constructor(private readonly flowService: FlowService) { }

    @Get()
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
    @ApiResponse({
        status: 201,
        description: 'The flow technology has been created.',
        type: Flow,
    })
    saveNew(@Body() newFlow: NewFlow): Promise<Flow> {
        return this.flowService.createFlow(newFlow);
    }
}
