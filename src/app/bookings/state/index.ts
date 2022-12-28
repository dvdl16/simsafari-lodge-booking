import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { Booking } from '../booking.model';
import { House } from '../house.model';
import { BookingState } from './booking.reducer';


export interface State extends AppState.State {
    bookings: BookingState;
}

// Selectors
const getBookingsFeatureState = createFeatureSelector<BookingState>('bookings');

export const getCurrentBookingId = createSelector(
    getBookingsFeatureState,
    state => state.currentBookingId
)

export const getCurrentHouseId = createSelector(
    getBookingsFeatureState,
    state => state.currentHouseId
)

export const getCurrentBooking = createSelector(
    getBookingsFeatureState,
    getCurrentBookingId,
    (state, currentBookingId) => {
        if (currentBookingId === '0') {
            return new Booking('0', '', '', '', 0, 'None')
            // return {
            //     bookingId: '0',
            //     userId: ' ',
            //     fromDate: ' ',
            //     toDate: ' ',
            //     houses: ' ',
            //     guestDetails: 'None'
            // }
        } else {
            return currentBookingId ? state.bookings.find(p => p.id === currentBookingId) : null;
        }
    }
)

export const getCurrentHouse = createSelector(
    getBookingsFeatureState,
    getCurrentHouseId,
    (state, currentHouseId) => {
        return currentHouseId ? state.houses.find(p => p.id === currentHouseId) : null;
    }
)

export const getBookings = createSelector(
    getBookingsFeatureState,
    state => state.bookings
)

export const getBookingsForHouse = (house: House) =>
  createSelector(
    getBookings,
    (bookings) => {
      return bookings.filter(function (booking) {
        return booking.house === house.id;
      });
    }
  );

export const getHouses = createSelector(
    getBookingsFeatureState,
    state => state.houses
)

export const getError = createSelector(
    getBookingsFeatureState,
    state => state.error
)
