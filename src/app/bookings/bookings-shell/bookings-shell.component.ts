import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Booking } from '../booking.model';
import { House } from '../house.model';
import { getBookings, getCurrentBooking, getCurrentHouse, getError, getHouses, State } from '../state';
import { BookingPageActions } from '../state/actions';

@Component({
  selector: 'app-bookings-shell',
  templateUrl: './bookings-shell.component.html',
  styleUrls: ['./bookings-shell.component.scss']
})
export class BookingsComponent implements OnInit {
  errorMessage!: string;
  bookings$!: Observable<Booking[]>;
  houses$!: Observable<House[]>;
  selectedBooking$!: Observable<Booking | null | undefined>;
  selectedHouse$!: Observable<House | null | undefined>;
  errorMessage$!: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(BookingPageActions.loadBookings());

    this.bookings$ = this.store.select(getBookings);
    this.houses$ = this.store.select(getHouses);
    this.errorMessage$ = this.store.select(getError);
    this.selectedBooking$ = this.store.select(getCurrentBooking);
    this.selectedHouse$ = this.store.select(getCurrentHouse);
  }

  ngOnDestroy(): void {
  }

  newBooking(bookingData: any): void {
    this.store.dispatch(BookingPageActions.createBooking(bookingData));
  }

  updateBooking(bookingData: Booking): void {
    this.store.dispatch(BookingPageActions.createBooking({booking: bookingData}));
  }

  bookingSelected(booking: Booking): void {
    this.store.dispatch(BookingPageActions.setCurrentBooking({ currentBookingId: booking.bookingId }));
  }

  houseSelected(house: House): void {
    this.store.dispatch(BookingPageActions.setCurrentHouse({ currentHouseId: house.id }));
  }

}
