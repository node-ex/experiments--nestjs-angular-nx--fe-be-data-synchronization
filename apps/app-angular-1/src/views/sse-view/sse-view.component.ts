import { Component, OnInit, signal, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sse-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sse-view.component.html',
  styleUrl: './sse-view.component.css',
})
export class SseViewComponent implements OnInit, OnDestroy {
  messages = signal<string[]>([]);
  private messageCount = 0;
  private maxMessages = 6;
  private eventSource!: EventSource;
  private readyStateNumber = signal<number>(0);
  private readyStateName = computed(() =>
    this.getReadyStateName(this.readyStateNumber()),
  );

  ngOnInit(): void {
    this.eventSource = new EventSource(
      'http://localhost:4200/api/sse?clientId=123',
    );

    this.readyStateNumber.set(this.eventSource.readyState);
    console.log('EventSource not started', this.readyStateName());

    // this.eventSource.addEventListener('notice', (event) => {
    //   console.log('EventSource notice event', event);
    // });

    this.eventSource.onmessage = (event: MessageEvent<string>) => {
      const payload = JSON.parse(event.data) as { message: string };
      this.messages.set([...this.messages(), payload.message]);

      this.messageCount += 1;
      if (this.messageCount >= this.maxMessages) {
        this.closeEventSource();
        this.readyStateNumber.set(this.eventSource.readyState);
        console.log('EventSource closed', this.readyStateName());
      }
    };

    this.eventSource.onopen = (event) => {
      this.readyStateNumber.set(this.eventSource.readyState);
      console.log(
        'EventSource onopen event',
        this.eventSource.url,
        this.readyStateName(),
        event,
      );
    };

    this.eventSource.onerror = (event) => {
      this.readyStateNumber.set(this.eventSource.readyState);
      console.log('EventSource onerror event', this.readyStateName(), event);
      // Client will automatically try to reconnect if the connection is not closed
      this.closeEventSource();
    };
  }

  ngOnDestroy(): void {
    this.eventSource.close();
  }

  private closeEventSource(): void {
    // onerror is not triggered when the client closes the connection
    this.eventSource.close();
    this.readyStateNumber.set(this.eventSource.readyState);
    console.log('EventSource closed', this.readyStateName());
  }

  private getReadyStateName(readyStateNumber: number): string {
    switch (readyStateNumber) {
      case EventSource.CONNECTING:
        return 'CONNECTING';
      case EventSource.OPEN:
        return 'OPEN';
      case EventSource.CLOSED:
        return 'CLOSED';
      default:
        return 'UNKNOWN';
    }
  }
}
