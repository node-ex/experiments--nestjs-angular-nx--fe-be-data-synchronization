import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// @WebSocketGateway(80, { namespace: 'events' })
@WebSocketGateway({
  path: '/api/websockets-socketio',
  // cors: {
  //   origin: '*',
  // },
})
export class WebsocketsSocketioGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  afterInit(server: Server) {
    console.log(
      'WebSockets server initialized',
      server.eventNames().toString(),
    );
  }

  handleConnection(
    // @ConnectedSocket()
    client: Socket,
    ...args: any[]
  ) {
    const { sockets } = this.server.sockets;

    console.log(
      `WebSockets client id: ${client.id} connected, ${args.toString()}`,
    );
    console.log(`Number of connected clients: ${sockets.size.toString()}`);

    setInterval(() => {
      client.emit('message', 'hello');
    }, 5000);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`WebSockets client id: ${client.id} disconnected`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: string,
  ): WsResponse<string> {
    console.log(`Message from client id: ${client.id}, ${payload}`);
    return { event: 'message', data: 'ack' };
  }

  // @SubscribeMessage('events')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  // }

  // @SubscribeMessage('identity')
  // async identity(@MessageBody() data: number): Promise<number> {
  //   return data;
  // }
}
