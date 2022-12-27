import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Booking, NewBookingData } from '../../booking.model';
import { House } from '../../house.model';
import { BookingEditComponent } from '../booking-edit/booking-edit.component';
import * as moment from 'moment';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.scss']
})
export class HouseCardComponent implements OnInit {
  @Input() house!: House;
  @Input() bookings!: Booking[];
  @Output() createBooking = new EventEmitter<NewBookingData>();
  @Output() updateBooking = new EventEmitter<Booking>();
  @Output() deleteBooking = new EventEmitter<string>();
  @Output() cardOpened = new EventEmitter<House>();
  @Output() cardClosed = new EventEmitter<House>();
  animal!: string;
  name!: string;

  displayedColumns: string[] = ['fromDate', 'toDate', 'userId', 'actions'];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  newBooking(): void {
    // Create array of unavailable/booked dates
    const unavailableDates = this.bookings.map(b => 
      [moment(b.fromDate, 'YYYY-MM-DD'), moment(b.toDate, 'YYYY-MM-DD')]
    );
    const dialogRef = this.dialog.open(BookingEditComponent, {
      data: {
        unavailableDates: unavailableDates,
        house: this.house
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if ('create' in result){
        this.createBooking.emit(result['create']);
      }
    });
  }

  editBooking(booking: Booking): void {
    // Create array of unavailable/booked dates
    const unavailableDates = this.bookings
      .filter(b => b.bookingId !== booking.bookingId)
      .map(b => 
        [moment(b.fromDate, 'YYYY-MM-DD'), moment(b.toDate, 'YYYY-MM-DD')]
      );
    const dialogRef = this.dialog.open(BookingEditComponent, {
      data: {
        unavailableDates: unavailableDates,
        house: this.house,
        booking: booking
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if ('update' in result){
        this.updateBooking.emit(result['update']);
      }
      else if ('delete' in result){
        this.deleteBooking.emit(result['delete']);
      }
    });

  }

  houseCardOpened(house: House): void {
    this.cardOpened.emit(house);
  }

  houseCardClosed(house: House): void {
    this.cardClosed.emit(house);
  }

}

export class NewBookingDialog {}