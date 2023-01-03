import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ScriptService } from 'src/app/_helpers/script.service';
import { Booking } from '../booking.model';
import { House } from '../house.model';
import { Payment, PaymentResult } from '../payment.model';
import { PaymentService } from '../payment.service';
import { getBookings, getCurrentBooking, getCurrentHouse, getError, getHouses, isBookingsLoading, State } from '../state';
import { BookingPageActions } from '../state/actions';

declare global {
  interface Window { payfast_do_onsite_payment: any; }
}

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
  bookingsLoading$!: Observable<boolean>;
  payFastScriptLoaded: boolean = false;
  paymentBeingProcessed: boolean = false;

  constructor(private store: Store<State>,
              private scriptService: ScriptService,
              private paymentService: PaymentService) { }

  ngOnInit(): void {
    // Load external scripts dynamically
    this.scriptService.load('PayfastOnsite').then(data => {
      console.log('script loaded ', data);
      this.payFastScriptLoaded = true;
    }).catch(error => console.log(error));

    this.store.dispatch(BookingPageActions.loadBookings());

    this.bookings$ = this.store.select(getBookings);
    this.houses$ = this.store.select(getHouses);
    this.errorMessage$ = this.store.select(getError);
    this.selectedBooking$ = this.store.select(getCurrentBooking);
    this.selectedHouse$ = this.store.select(getCurrentHouse);
    this.bookingsLoading$ = this.store.select(isBookingsLoading);
  }

  ngOnDestroy(): void {
  }

  newBooking(bookingData: Booking): void {
    this.paymentBeingProcessed = true;
    const payment = new Payment(
        "John",
        "john@wick.com",
        "800ed9d7-4364-4341-8b36-c6513047853a",
        "100.00",
        "Jabulani Guest Houses 2022-12-30",
        "Booking for Jabulani Guest House 2022-12-30 to 2022-12-31 made on onsjabulani.co.za",
        "6430d86a-e2c8-4faf-8d51-5e38bbf681dc"
    )
    let bookingsComp = this;
    this.paymentService.createPayment(payment)
      .subscribe((paymentResult: PaymentResult) => {
        console.log(JSON.stringify(paymentResult));
        window.payfast_do_onsite_payment(paymentResult, function(result: any) {
          if (result === true) {
            // Payment Completed
            console.log("Payment Completed");
            bookingsComp.store.dispatch(BookingPageActions.createBooking({booking: bookingData}));
          }
          else {
            // Payment Window Closed
            console.log("Payment Window Closed")
          }
        }); 
      });
  }

  updateBooking(bookingData: Booking): void {
    this.store.dispatch(BookingPageActions.updateBooking({booking: bookingData}));
  }

  deleteBooking(bookingId: string): void {
    this.store.dispatch(BookingPageActions.deleteBooking({id: bookingId}));
  }

  bookingSelected(booking: Booking): void {
    this.store.dispatch(BookingPageActions.setCurrentBooking({ currentBookingId: booking.id }));
  }

  houseSelected(house: House): void {
    this.store.dispatch(BookingPageActions.setCurrentHouse({ currentHouseId: house.id }));
  }

  houseDeselected(house: House): void {
    this.store.dispatch(BookingPageActions.clearCurrentHouse({ currentHouseId: house.id }));
  }
}
