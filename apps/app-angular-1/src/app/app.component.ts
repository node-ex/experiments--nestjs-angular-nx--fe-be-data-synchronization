import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SseComponent } from '../components/sse/sse.component';
import { RestApiComponent } from '../components/rest-api/rest-api.component';

@Component({
  standalone: true,
  imports: [RouterModule, RestApiComponent, SseComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app-angular-1';
}
