import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeatModel } from '../../interfaces/seatModel';

@Component({
  selector: 'app-seat-model',
  imports: [RouterLink],
  template: `
    <section class="model-card">
      <h2 class="model-title">{{ seatModel().title }}</h2>
      <p class="model-url">
        <a [href]="seatModel().url" target="_blank" rel="noopener noreferrer">
          Wikipedia ↗
        </a>
      </p>
      <p class="model-image">
        <img [src]="seatModel().image" alt="{{ seatModel().title }}" />
      </p>
      <a class="details-link" [routerLink]="['/details', modelIndex()]">Ver detalles</a>
    </section>
  `,
  styleUrls: ['./seat-model.css'],
})
export class SeatModelComponent {
  seatModel = input.required<SeatModel>();
  modelIndex = input.required<number>();
}
