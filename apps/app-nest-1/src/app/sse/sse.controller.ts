import { Controller, Sse } from '@nestjs/common';
import {
  concatMap,
  delay,
  expand,
  interval,
  map,
  Observable,
  of,
  take,
} from 'rxjs';

@Controller('sse')
export class SseController {
  @Sse()
  // Must return an Observable stream
  getMessages(): Observable<MessageEvent> {
    return interval(1000).pipe(
      take(5), // Limit to 5 emissions
      map(
        (_) =>
          ({
            data: { message: 'hello' },
            /* type property is renamed to event property before being sent */
            // type: 'notice',
          } as MessageEvent),
      ),
    );

    // return interval(1000).pipe(
    //   take(5), // Take only the first 5 emissions from the interval
    //   map(() => ({ data: { message: 'Hello from server!' } } as MessageEvent)), // Map each emission to a message event with a 'Hello from server!' message
    //   concatMap((message, index) => {
    //     return of(message).pipe(
    //       delay(index === 4 ? 180000 : 0), // Delay the emission of the message by 3 minutes (180000 ms) if it's the 5th message (index 4)
    //     );
    //   }),
    //   expand((_, index) => {
    //     return index % 5 === 4 // Check if the current index is the 5th message in the cycle (index 4)
    //       ? interval(1000).pipe(
    //           take(5), // Take the next 5 emissions from the interval
    //           map(
    //             () =>
    //               ({ data: { message: 'Hello from server!' } } as MessageEvent),
    //           ), // Map each emission to a message event with a 'Hello from server!' message
    //           concatMap((message, idx) =>
    //             of(message).pipe(delay(idx === 4 ? 180000 : 0)),
    //           ), // Delay the emission of the message by 3 minutes if it's the 5th message (index 4) in the new cycle
    //         )
    //       : of(); // If not in the 5th message of a cycle, just return an observable that completes immediately
    //   }),
    // );
  }
}
