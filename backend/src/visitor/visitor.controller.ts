import { Body, Controller, Post } from '@nestjs/common';
import { VisitorDto } from './dto/visitor.dto';
import { VisitorService } from './visitor.service';
import { type IResult } from 'ua-parser-js';
import { UserAgent } from '../common/decorators/user-agent.decorator';
import { ClientIp } from '../common/decorators/client-ip.decorator';

@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}
  @Post()
  postVisitors(
    @Body() data: VisitorDto,
    @UserAgent() uaResult: IResult,
    @ClientIp() clientIp: string,
  ) {
    return this.visitorService.saveVisitor(data, uaResult, clientIp);
  }
}
