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
import { Server, WebSocket } from 'ws';

@WebSocketGateway({
  path: '/api/websockets-ws',
  // cors: {
  //   origin: '*',
  // },
})
export class WebsocketsWsGateway
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
    client: WebSocket,
    ...args: any[]
  ) {
    const clients = this.server.clients;

    console.log(
      `WebSockets client id: ${client.url} connected, ${args.toString()}`,
    );
    console.log(`Number of connected clients: ${clients.size.toString()}`);

    setInterval(() => {
      client.send('hello');
    }, 5000);
  }

  handleDisconnect(@ConnectedSocket() client: WebSocket) {
    console.log(`WebSockets client id: ${client.url} disconnected`);
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: WebSocket,
    @MessageBody() payload: string,
  ): WsResponse<string> {
    console.log(`Message from client id: ${client.url}, ${payload}`);
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
