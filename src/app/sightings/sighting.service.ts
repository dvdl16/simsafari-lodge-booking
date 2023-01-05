import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Sighting } from './sighting.model';


@Injectable({
  providedIn: 'root',
})
export class SightingService {
  private sightingsUrl = environment.iNatApiUrl;

  constructor(private http: HttpClient) { }

  getSightings(): Observable<Sighting[]> {
    // Return all sightings records during development
    const params = environment.production ?
      {
        limit: 25,
        order: "desc",
        order_by: "observed_on"
      } : undefined
    return this.http.get<Sighting[]>(this.sightingsUrl, {params: params})
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }

  private handleError(err: any) {
    // TODO: send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(() => new Error(errorMessage))
  }

}
