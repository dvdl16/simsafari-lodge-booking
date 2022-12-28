import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCurrentUser } from 'src/app/user/state/user.reducer';
import { User } from 'src/app/user/user';
import { Booking } from '../booking.model';
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
  @Output() createNewBooking = new EventEmitter<Booking>();
  @Output() updateExistingBooking = new EventEmitter<Booking>();
  @Output() deleteExistingBooking = new EventEmitter<string>();
  @Output() houseWasSelected = new EventEmitter<House>();
  @Output() houseWasDeselected = new EventEmitter<House>();
  currentUser$!: Observable<User | null>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.currentUser$ = this.store.select(getCurrentUser);
  }

  filterBookings(house: House): Observable<Booking[]> {
    return this.store.select(getBookingsForHouse(house));
  }

  newBooking(bookingData: Booking): void {
    this.createNewBooking.emit(bookingData);
  }

  updateBooking(bookingData: Booking): void {
    this.updateExistingBooking.emit(bookingData);
  }

  deleteBooking(id: string): void {
    this.deleteExistingBooking.emit(id);
  }

  houseSelected(house: House): void {
    this.houseWasSelected.emit(house);
  }

  clearSelectedHouse(house: House): void {
    this.houseWasDeselected.emit(house);
  }

}
