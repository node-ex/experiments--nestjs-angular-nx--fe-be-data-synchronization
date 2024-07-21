import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-rest-api-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rest-api-view.component.html',
  styleUrl: './rest-api-view.component.css',
})
export class RestApiViewComponent {
  http = inject(HttpClient);
  message = toSignal(
    this.http
      .get<{ message: string }>('/api/rest-api')
      .pipe(map((val) => val.message)),
    { initialValue: '' },
  );
}
