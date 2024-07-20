import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-rest-api',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rest-api.component.html',
  styleUrl: './rest-api.component.css',
})
export class RestApiComponent {
  http = inject(HttpClient);
  message = toSignal(
    this.http
      .get<{ message: string }>('/api/rest-api')
      .pipe(map((val) => val.message)),
    { initialValue: '' },
  );
}
