import { Controller, Sse } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';

@Controller('sse')
export class SseController {
  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ data: { message: 'hello' } } as MessageEvent)),
    );
  }
}
