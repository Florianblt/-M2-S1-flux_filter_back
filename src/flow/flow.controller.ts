import {
    Controller,
    Get,
    Post,
    Body,
    Req,
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
        description: 'The list of all the apps.',
        type: Flow,
        isArray: true,
    })
    findAll(): Promise<Flow[]> {
        return this.flowService.findAll();
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
