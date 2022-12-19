import * as moment from 'moment';

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateValidators } from 'src/app/shared/date.validator';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { House } from '../../house.model';
import { newBookingData } from '../../booking.model';


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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      unavailableDates: moment.Moment[][],
      house: House
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
      house: [this.data.house.id, Validators.required],
      guestDetails: ['', Validators.compose(
        [Validators.required, Validators.maxLength(100)]
      )],
      range: this.formBuilder.group({
        fromDate: ['', Validators.compose(
          [Validators.required,DateValidators.relativeDate(0, 100)]
        )],
        toDate: ['', Validators.compose(
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
    const bookingData = new newBookingData(
      moment(booking.value.range.fromDate).format('YYYY-MM-DD'),
      moment(booking.value.range.toDate).format('YYYY-MM-DD'),
      booking.value.house,
      booking.value.guestDetails
    )
    this.dialogRef.close(bookingData);
  }

}
