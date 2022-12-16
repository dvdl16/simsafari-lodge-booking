import { DataSource } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject } from 'rxjs';
import { Booking } from '../../booking.model';
import { House } from '../../house.model';
import { getBookings, State } from '../../state';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.scss']
})
export class HouseCardComponent implements OnInit {
  @Input() house!: House;
  @Input() bookings!: Booking[];

  displayedColumns: string[] = ['fromDate', 'toDate', 'userId'];

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    
    console.log('this.bookings', this.bookings);
  }

  nextStep(): void {

  }


}
