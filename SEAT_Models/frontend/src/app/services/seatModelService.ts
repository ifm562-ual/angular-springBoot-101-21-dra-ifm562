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

    /** Loads all SEAT models from backend */
    getAllModels(): Observable<SeatModel[]> {
        return this.http.get<SeatModel[]>('http://localhost:8080/api/cars');
    }

    /** Returns a single model by its index (used as ID). */
    getModelById(id: number): Observable<SeatModel | undefined> {
        return this.getAllModels().pipe(
            map((models) => models[id])
        );
    }
}
