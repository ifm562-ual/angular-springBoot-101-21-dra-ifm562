import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SeatModelService } from '../../services/seatModelService';
import { SeatModel } from '../../interfaces/seatModel';

@Component({
    selector: 'app-details',
    imports: [RouterLink],
    template: `
    <article class="details">
      @if (loading()) {
        <p>Cargando...</p>
      } @else if (model()) {
        <section class="details-header">
          <h1 class="model-title">SEAT {{ model()!.title }}</h1>
          <a class="back-link" [routerLink]="['/']">← Volver a la lista</a>
        </section>

        <section class="details-body">
          <h2 class="section-heading">Sobre este modelo</h2>
          <p class="wiki-note">
            Puedes consultar información detallada sobre el <strong>SEAT {{ model()!.title }}</strong>
            en Wikipedia:
          </p>
          <a class="wiki-link" [href]="model()!.url" target="_blank" rel="noopener noreferrer">
            Abrir página de Wikipedia ↗
          </a>
        </section>

        <section class="details-meta">
          <h2 class="section-heading">Datos técnicos</h2>
          <ul>
            <li><strong>Nombre:</strong> SEAT {{ model()!.title }}</li>
            <li><strong>Fuente:</strong> Wikipedia (es)</li>
            <li>
              <strong>URL:</strong>
              <a [href]="model()!.url" target="_blank" rel="noopener noreferrer">
                {{ model()!.url }}
              </a>
            </li>
          </ul>
        </section>
      } @else {
        <p>Modelo no encontrado.</p>
        <a [routerLink]="['/']">← Volver a la lista</a>
      }
    </article>
  `,
    styleUrls: ['./details.css'],
})
export class Details implements OnInit {
    route = inject(ActivatedRoute);
    seatModelService = inject(SeatModelService);

    model = signal<SeatModel | undefined>(undefined);
    loading = signal(true);

    ngOnInit() {
        const modelId = parseInt(this.route.snapshot.params['id'], 10);
        this.seatModelService.getAllModels().subscribe((response: any) => {
            const cars = response._embedded.cars;
            const car = cars[modelId];
            if (car) {
                this.model.set({
                    title: car.name,
                    url: car.url,
                    image: car.image || ''
                });
            }
            this.loading.set(false);
        });
    }
}
