import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Payment, PaymentResult } from './payment.model';


@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private paymentsUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) { }

  createPayment(payment: Payment): Observable<PaymentResult> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('createPayment: ',payment);
    return this.http.post<PaymentResult>(this.paymentsUrl, payment, { headers })
      .pipe(
        tap(data => console.log('✅ created payment: ' + JSON.stringify(data))),
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
