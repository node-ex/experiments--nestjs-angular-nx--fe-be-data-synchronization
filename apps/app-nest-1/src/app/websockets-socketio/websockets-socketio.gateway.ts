import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// @WebSocketGateway(80, { namespace: 'events' })
@WebSocketGateway({ path: '/api/websockets-socketio' })
export class WebsocketsSocketioGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  afterInit(server: Server) {
    console.log('WebSockets server initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('WebSockets client connected', args);

    setInterval(() => {
      client.emit('message', 'hello');
    }, 5000);
  }

  handleDisconnect(client: Socket) {
    console.log('WebSocktes client disconnected');
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    console.log(`Message from client: ${payload}`);
  }
}
