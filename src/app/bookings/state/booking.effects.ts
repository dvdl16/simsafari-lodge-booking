import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, concatMap, map, mergeMap } from "rxjs/operators";
import { BookingService } from "../booking.service";
import { BookingApiActions, BookingPageActions } from "./actions";


@Injectable()
export class BookingEffects {

    constructor(private actions$: Actions,
        private bookingService: BookingService) { }

    loadBookings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BookingPageActions.loadBookings),
            mergeMap(() => this.bookingService.getBookings().pipe(
                map(bookings => BookingApiActions.loadBookingsSuccess({ bookings })),
                catchError(error => of(BookingApiActions.loadBookingsFailure({ error })))
            ))
        )
    })

    updateBooking$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BookingPageActions.updateBooking),
                concatMap(action => 
                    this.bookingService.updateBooking(action.booking)
                        .pipe(
                            map(booking => BookingApiActions.updateBookingSuccess({ booking })),
                            catchError(error => of(BookingApiActions.updateBookingFailure({ error })))
                        )
                )
            )
    })

    createBooking$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BookingPageActions.createBooking),
                concatMap(action =>
                    this.bookingService.createBooking(action.booking)
                        .pipe(
                            map(booking => BookingApiActions.createBookingSuccess({ booking })),
                            catchError(error => of(BookingApiActions.createBookingFailure({ error })))
                        )
                )
            )
    })

    deleteBooking$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(BookingPageActions.deleteBooking),
                mergeMap(action =>
                    this.bookingService.deleteBooking(action.id)
                        .pipe(
                            map(() => BookingApiActions.deleteBookingSuccess({ bookingId: action.id })),
                            catchError(error => of(BookingApiActions.deleteBookingFailure({ error })))
                        )
                    )
            )
    })
}