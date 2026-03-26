import { Component, inject, OnInit, signal } from '@angular/core';
import { SeatModelComponent } from '../seat-model/seat-model';
import { SeatModel } from '../../interfaces/seatModel';
import { SeatModelService } from '../../services/seatModelService';

@Component({
  selector: 'app-home',
  imports: [SeatModelComponent],
  template: `
    <section>
      <form>
        <input
          type="text"
          placeholder="Filtrar por nombre..."
          #filter
          (input)="filterResults(filter.value)"
        />
        <button class="primary" type="button" (click)="filterResults(filter.value)">
          Buscar
        </button>
      </form>
    </section>
    <section class="results">
      @if (loading()) {
        <p class="loading-msg">Cargando modelos SEAT...</p>
      } @else {
        @for (model of filteredList(); track $index) {
          <app-seat-model
            [seatModel]="model"
            [modelIndex]="getOriginalIndex(model)"
          />
        }
        @if (filteredList().length === 0) {
          <p class="no-results">No se encontraron modelos con ese nombre.</p>
        }
      }
    </section>
  `,
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  private seatModelService = inject(SeatModelService);

  allModels = signal<SeatModel[]>([]);
  filteredList = signal<SeatModel[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.seatModelService.getAllModels().subscribe((response: any) => {
      console.log("allModels data: ", response);
      const models: SeatModel[] = response._embedded.cars.map((car: any) => ({
        title: car.name,
        url: car.url,
        image: car.image || ''
      }));
      this.allModels.set(models);
      this.filteredList.set(models);
      this.loading.set(false);
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredList.set(this.allModels());
      return;
    }
    this.filteredList.set(
      this.allModels().filter((model) =>
        model.title.toLowerCase().includes(text.toLowerCase())
      )
    );
  }

  /** Returns the original index of a model in the full list (used as route ID). */
  getOriginalIndex(model: SeatModel): number {
    return this.allModels().indexOf(model);
  }
}
