import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sse.component.html',
  styleUrl: './sse.component.css',
})
export class SseComponent implements OnInit {
  messages = signal<string[]>([]);

  ngOnInit(): void {
    const eventSource = new EventSource('http://localhost:4200/api/sse');
    eventSource.onmessage = (event: MessageEvent<string>) => {
      const payload = JSON.parse(event.data) as { message: string };
      this.messages.set([...this.messages(), payload.message]);
    };
  }
}
