import { createAction, props } from "@ngrx/store"
import { Booking } from "../../booking.model"

export const loadBookingsSuccess = createAction(
    '[Bookings API] Load Success',
    props<{ bookings: Booking[]}>()
)

export const loadBookingsFailure = createAction(
    '[Bookings API] Load Failure',
    props<{ error: string }>()
)

export const updateBookingSuccess = createAction(
    '[Bookings API] Update Booking Success',
    props<{ booking: Booking }>()
)

export const updateBookingFailure = createAction(
    '[Bookings API] Update Booking Failure',
    props<{ error: string }>()
)

export const createBookingSuccess = createAction(
    '[Bookings API] Create Booking Success',
    props<{ booking: Booking }>()
)

export const createBookingFailure = createAction(
    '[Bookings API] Create Booking Failure',
    props<{ error: string }>()
)

export const  deleteBookingSuccess = createAction(
    '[Bookings API] Delete Booking Success',
    props<{ bookingId: string }>()
)

export const deleteBookingFailure = createAction(
    '[Bookings API] Delete Booking Failure',
    props<{ error: string }>()
)
