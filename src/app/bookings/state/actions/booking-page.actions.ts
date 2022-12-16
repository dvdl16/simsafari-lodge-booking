import { createAction, props } from "@ngrx/store";
import { Booking } from "../../booking.model";

export const setCurrentHouse = createAction(
    '[Bookings Page] Set Current House',
    props<{ currentHouseId: number }>()
)

export const clearCurrentHouse = createAction(
    '[Bookings Page] Clear Current House'
)

export const initialiseCurrentHouse = createAction(
    '[Bookings Page] Initialise Current House'
)

export const setCurrentBooking = createAction(
    '[Bookings Page] Set Current Booking',
    props<{ currentBookingId: string }>()
)

export const clearCurrentBooking = createAction(
    '[Bookings Page] Clear Current Booking'
)

export const initialiseCurrentBooking = createAction(
    '[Bookings Page] Initialise Current Booking'
)

export const loadBookings = createAction(
    '[Bookings Page] Load'
)

export const updateBooking = createAction(
    '[Bookings Page] Update Booking',
    props<{ booking: Booking }>()
)

export const createBooking = createAction(
    '[Bookings Page] Create Booking',
    props<{ booking: Booking }>()
)

export const deleteBooking = createAction(
    '[Bookings Page] Delete Booking',
    props<{ id: string }>()
)
