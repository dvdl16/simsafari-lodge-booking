import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ScriptService } from 'src/app/_helpers/script.service';
import { Booking } from '../booking.model';
import { House } from '../house.model';
import { Payment, PaymentResult } from '../payment.model';
import { PaymentService } from '../payment.service';
import { getBookings, getCurrentBooking, getCurrentHouse, getError, getHouses, isBookingsLoading, State } from '../state';
import { BookingPageActions } from '../state/actions';
import moment from 'moment';

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
  paymentSubscription!: Subscription;
  housesSubscription!: Subscription;
  houses!: House[];

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
    this.housesSubscription = this.houses$.subscribe(houses => {
      this.houses = houses;
    })
  }

  ngOnDestroy(): void {
    if (this.housesSubscription){
      this.housesSubscription.unsubscribe();
    }
    if (this.paymentSubscription){
      this.paymentSubscription.unsubscribe();
    }
  }

  newBooking(bookingData: Booking): void {
    this.paymentBeingProcessed = true;
    const from = moment(bookingData.fromDate, 'YYYY-MM-DD');
    const to = moment(bookingData.toDate, 'YYYY-MM-DD');
    const duration = to.diff(from, 'days');
    const bookingHouse = this.houses.filter(h => h.id === bookingData.Houses[0])[0];
    const rate = bookingHouse.rate * duration;
    const payment = new Payment(
        bookingData.userName,
        bookingData.userContact,
        uuidv4(),
        rate.toString(),
        `Jabulani ${bookingHouse.name} ${bookingData.fromDate}`,
        `Jabulani ${bookingHouse.name} ${bookingData.fromDate} to ${bookingData.toDate} made on onsjabulani.co.za`,
        bookingData.id
    )
    let bookingsComp = this;
    this.paymentSubscription = this.paymentService.createPayment(payment)
      .subscribe((paymentResult: PaymentResult) => {
        console.log(JSON.stringify(paymentResult));
        if (paymentResult.identifier) {
          window.payfast_do_onsite_payment({"uuid":paymentResult.identifier}, function(result: any) {
            if (result === true) {
              // Payment Completed
              console.log("Payment Completed");
              bookingsComp.store.dispatch(BookingPageActions.createBooking({booking: bookingData}));
            }
            else {
              // Payment Window Closed
              console.log("Payment Window Closed")
            }
            bookingsComp.paymentBeingProcessed = false;
          });
        }
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
