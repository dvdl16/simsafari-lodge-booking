import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Booking } from './booking.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookingsUrl = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) { }

  getBookings(): Observable<Booking[]> {
    const today = moment().format("YYYY-MM-DD");
    // Return all booking records during development
    const params = environment.production ? {fromDate: today} : undefined
    return this.http.get<Booking[]>(this.bookingsUrl, {params: params})
      .pipe(
        // tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createBooking(booking: Booking): Observable<Booking> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Booking>(this.bookingsUrl, booking, { headers })
      .pipe(
        // tap(data => console.log('createBooking: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteBooking(id: string): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.bookingsUrl}/${id}`;
    return this.http.delete<Booking>(url, { headers })
      .pipe(
        tap(data => console.log('deleteBooking: ' + id)),
        catchError(this.handleError)
      );
  }

  updateBooking(booking: Booking): Observable<Booking> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = environment.production ? this.bookingsUrl : `${this.bookingsUrl}/${booking.id}`;
    return this.http.put<Booking>(url, booking, { headers })
      .pipe(
        // tap(() => console.log('updateBooking: ' + booking.id)),
        // Update the item in the list
        // This is required because the selected booking that was edited
        // was a copy of the item from the array.
        // Return the booking on an update
        map(() => booking),
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
