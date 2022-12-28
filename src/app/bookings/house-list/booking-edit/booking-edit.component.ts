import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateValidators } from 'src/app/shared/date.validator';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { House } from '../../house.model';
import { Booking } from '../../booking.model';


@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.scss']
})
export class BookingEditComponent implements OnInit {
  bookingForm!: FormGroup;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  private returnData: { [key: string]: Booking | string } | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      unavailableDates: moment.Moment[][],
      house: House,
      booking?: Booking
    },
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BookingEditComponent>) {

      // Defines all of the validation messages for the form.
      // These could instead be retrieved from a file or database.
      this.validationMessages = {
        fromDate: {
          required: 'From Date is required.',
          relativeDate: 'From Date must be between today and a date in the next 3 months.',
        },
        toDate: {
          required: 'To Date is required.',
          relativeDate: 'To Date must be between today and a date in the next 3 months.',
          matEndDateInvalid: 'To Date must be earlier than From Date',
          datesAvailable: 'These dates are not available'
        },
        house: {
          required: 'House is required.',
        },
        guestDetails: {
          maxlength: 'Guest Details must be fewer than 100 characters.'
        }
      };
  
      // Define an instance of the validator for use with this form,
      // passing in this form's set of validation messages.
      this.genericValidator = new GenericValidator(this.validationMessages);}

  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      house: ''
    })

    // Define the form group
    this.bookingForm = this.formBuilder.group({
      house: [this.data.booking ? this.data.booking.Houses[0] : this.data.house.id, Validators.required],
      guestDetails: [this.data.booking ? this.data.booking.guestDetails : '', Validators.compose(
        [Validators.required, Validators.maxLength(100)]
      )],
      range: this.formBuilder.group({
        fromDate: [this.data.booking ? this.data.booking.fromDate : '', Validators.compose(
          [Validators.required,DateValidators.relativeDate(0, 100)]
        )],
        toDate: [this.data.booking ? this.data.booking.toDate : '', Validators.compose(
          [Validators.required, DateValidators.relativeDate(0, 100)]
        )],
      }),
    },
    {
      validator: DateValidators.datesAvailable(
        'range.fromDate',
        'range.toDate',
        this.data.unavailableDates
      )
    });

    // Watch for value changes for validation
    this.bookingForm.valueChanges.subscribe(
      () => this.displayMessage = this.genericValidator.processMessages(this.bookingForm)
    );
    this.bookingForm.markAllAsTouched();
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.bookingForm);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(booking: FormGroup) {
    if (!this.returnData) {
      if (this.data.booking) {
        this.returnData = {'update': new Booking(
          this.data.booking.id,
          this.data.booking.userId,
          moment(booking.value.range.fromDate).format('YYYY-MM-DD'),
          moment(booking.value.range.toDate).format('YYYY-MM-DD'),
          [booking.value.house],
        )}
      }
      else {
          uuidv4(),
          moment(booking.value.range.fromDate).format('YYYY-MM-DD'),
          moment(booking.value.range.toDate).format('YYYY-MM-DD'),
          [booking.value.house],
        )}
      }
    }
    this.dialogRef.close(this.returnData);
  }

  deleteBooking() {
    if (this.data.booking) {
      this.returnData = {'delete': this.data.booking.bookingId}
      this.dialogRef.close(this.returnData);
    }
  }
}
