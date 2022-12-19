import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Booking, newBookingData } from '../../booking.model';
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
  @Output() createNewBooking = new EventEmitter<newBookingData>();
  @Output() updateBooking = new EventEmitter<Booking>();
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
      this.createNewBooking.emit(result);
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
      this.updateBooking.emit(result);
    });

  }


  openDialog(): void {
  }


}

export class NewBookingDialog {}