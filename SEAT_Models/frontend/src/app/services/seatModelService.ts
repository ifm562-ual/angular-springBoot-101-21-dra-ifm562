import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeatModel } from '../interfaces/seatModel';

@Injectable({
    providedIn: 'root',
})
export class SeatModelService {
    private http = inject(HttpClient);

    /** Loads all SEAT models from the static assets/models.json */
    getAllModels(): Observable<SeatModel[]> {
        return this.http.get<SeatModel[]>('assets/models.json');
    }

    /** Returns a single model by its index (used as ID). */
    getModelById(id: number): Observable<SeatModel | undefined> {
        return this.getAllModels().pipe(
            map((models) => models[id])
        );
    }
}
