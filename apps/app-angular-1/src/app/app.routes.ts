import { Route } from '@angular/router';
import { HomeViewComponent } from '../views/home-view/home-view.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeViewComponent,
  },
  {
    path: 'rest-api',
    loadComponent: () =>
      import('../views/rest-api-view/rest-api-view.component').then(
        (c) => c.RestApiViewComponent,
      ),
  },
  {
    path: 'sse',
    loadComponent: () =>
      import('../views/sse-view/sse-view.component').then(
        (c) => c.SseViewComponent,
      ),
  },
  {
    path: 'websockets-socketio',
    loadComponent: () =>
      import(
        '../views/websockets-socketio-view/websockets-socketio-view.component'
      ).then((c) => c.WebsocketsSocketioViewComponent),
  },
  {
    path: 'websockets-ws',
    loadComponent: () =>
      import('../views/websockets-ws-view/websockets-ws-view.component').then(
        (c) => c.WebsocketsWsViewComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
