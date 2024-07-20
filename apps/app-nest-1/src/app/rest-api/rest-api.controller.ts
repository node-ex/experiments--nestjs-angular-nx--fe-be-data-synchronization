import { Controller, Get } from '@nestjs/common';

@Controller('rest-api')
export class RestApiController {
  @Get()
  getMessage() {
    return { message: 'hello' };
  }
}
