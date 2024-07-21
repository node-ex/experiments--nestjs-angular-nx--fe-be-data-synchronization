import { Module } from '@nestjs/common';
import { WebsocketsSocketioGateway } from './websockets-socketio.gateway';

@Module({
  providers: [WebsocketsSocketioGateway],
})
export class WebsocketsSocketioModule {}
