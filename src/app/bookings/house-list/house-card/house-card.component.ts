import { Component, Input, OnInit } from '@angular/core';
import { Booking } from '../../booking.model';
import { House } from '../../house.model';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.scss']
})
export class HouseCardComponent implements OnInit {
  @Input() house!: House;
  @Input() bookings!: Booking[];

  displayedColumns: string[] = ['fromDate', 'toDate', 'userId'];

  constructor() { }

  ngOnInit(): void {
  }

  newBooking(): void {

  }


}
