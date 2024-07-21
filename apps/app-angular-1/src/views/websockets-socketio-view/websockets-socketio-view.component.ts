import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-websockets-socketio-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './websockets-socketio-view.component.html',
  styleUrl: './websockets-socketio-view.component.css',
})
export class WebsocketsSocketioViewComponent implements OnInit, OnDestroy {
  messages = signal<string[]>([]);
  private messageCount = 0;
  private maxMessages = 5;
  private socket!: Socket;

  ngOnInit(): void {
    this.socket = io('http://localhost:4200', {
      path: '/api/websockets-socketio',
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connection established');
    });

    this.socket.on('message', (data: string) => {
      this.messages.set([...this.messages(), data]);

      this.messageCount += 1;
      if (this.messageCount >= this.maxMessages) {
        this.closeConnection();
      }
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket connection closed');
    });
  }

  ngOnDestroy(): void {
    this.closeConnection();
  }

  sendMessage(): void {
    this.socket.emit('message', 'hello');
  }

  closeConnection(): void {
    this.socket.disconnect();
    console.log('WebSocket connection closed by client');
  }
}
