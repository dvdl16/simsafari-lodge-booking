import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Booking, NewBookingData } from '../booking.model';
import { House } from '../house.model';
import { getBookings, getBookingsForHouse, State } from '../state';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss']
})
export class HouseListComponent implements OnInit {
  @Input() errorMessage!: string;
  @Input() bookings$!: Observable<Booking[]>;
  @Input() houses!: House[];
  @Input() selectedBooking!: Booking | null | undefined;
  @Input() selectedHouse!: House;
  @Output() createNewBooking = new EventEmitter<NewBookingData>();
  @Output() updateExistingBooking = new EventEmitter<Booking>();
  @Output() deleteExistingBooking = new EventEmitter<string>();
  @Output() houseWasSelected = new EventEmitter<House>();

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
  }

  filterBookings(house: House): Observable<Booking[]> {
    return this.store.select(getBookingsForHouse(house));
  }

  newBooking(bookingData: NewBookingData): void {
    this.createNewBooking.emit(bookingData);
  }

  updateBooking(bookingData: Booking): void {
    this.updateExistingBooking.emit(bookingData);
  }

  deleteBooking(bookingId: string): void {
    this.deleteExistingBooking.emit(bookingId);
  }

  houseSelected(house: House): void {
    this.houseWasSelected.emit(house);
  }

}
