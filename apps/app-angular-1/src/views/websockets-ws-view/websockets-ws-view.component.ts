import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-websockets-ws-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './websockets-ws-view.component.html',
  styleUrl: './websockets-ws-view.component.css',
})
export class WebsocketsWsViewComponent implements OnInit, OnDestroy {
  messages = signal<string[]>([]);
  private messageCount = 0;
  private maxMessages = 5;
  private socket!: WebSocket;

  ngOnInit(): void {
    this.socket = new WebSocket('ws://localhost:4200/api/websockets-ws');

    this.socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    this.socket.onmessage = (event: MessageEvent<string>) => {
      this.messages.set([...this.messages(), event.data]);

      this.messageCount += 1;
      if (this.messageCount >= this.maxMessages) {
        this.closeConnection();
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    this.socket.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
    };
  }

  ngOnDestroy(): void {
    this.closeConnection();
  }

  sendMessage(): void {
    this.socket.send('hello');
  }

  closeConnection(): void {
    this.socket.close();
    console.log('WebSocket connection closed by client');
  }
}
