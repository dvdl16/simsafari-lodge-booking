import { createReducer, on } from "@ngrx/store";
import { Booking } from "../booking.model";
import { House, Houses } from "../house.model";
import { BookingApiActions, BookingPageActions } from "./actions";

export interface BookingState {
    currentHouseId: string | null;
    currentBookingId: string | null;
    bookings: Booking[];
    houses: House[];
    error: string;
    isLoading: boolean;
}

const initialState: BookingState = {
    currentHouseId: null,
    currentBookingId: null,
    bookings: [],
    houses: Houses,
    error: '',
    isLoading: false
}

// Reducer
export const bookingReducer = createReducer<BookingState>(
    initialState,
    on(BookingPageActions.setCurrentHouse, (state, action): BookingState => {
        return {
            ...state,
            currentHouseId: action.currentHouseId
        }
    }),
    on(BookingPageActions.clearCurrentHouse, (state, action): BookingState => {
        if (state.currentHouseId === action.currentHouseId) {
            return {
                ...state,
                currentHouseId: null
            }
        }
        else {
            return state;
        }
    }),
    on(BookingPageActions.initialiseCurrentHouse, (state): BookingState => {
        return {
            ...state,
            currentHouseId: "0"
        }
    }),
    on(BookingPageActions.setCurrentBooking, (state, action): BookingState => {
        return {
            ...state,
            currentBookingId: action.currentBookingId
        }
    }),
    on(BookingPageActions.clearCurrentBooking, (state): BookingState => {
        return {
            ...state,
            currentBookingId: null
        }
    }),
    on(BookingPageActions.initialiseCurrentBooking, (state): BookingState => {
        return {
            ...state,
            currentBookingId: '0'
        }
    }),
    on(BookingPageActions.loadBookings, (state): BookingState => {
        return {
            ...state,
            isLoading: true
        }
    }),
    on(BookingApiActions.loadBookingsSuccess, (state, action): BookingState => {
        return {
            ...state,
            bookings: action.bookings,
            error: '',
            isLoading: false
        }
    }),
    on(BookingApiActions.loadBookingsFailure, (state, action): BookingState => {
        return {
            ...state,
            bookings: [],
            error: action.error,
            isLoading: false
        }
    }),
    on(BookingApiActions.updateBookingSuccess, (state, action): BookingState => {
        const updatedBookings = state.bookings.map(
            item => action.booking.id === item.id ? action.booking : item
        );
        return {
            ...state,
            bookings: updatedBookings,
            currentBookingId: action.booking.id,
            error: ''
        }
    }),
    on(BookingApiActions.updateBookingFailure, (state, action): BookingState => {
        return {
            ...state,
            error: action.error
        }
    }),
    on(BookingApiActions.createBookingSuccess, (state, action): BookingState => {
        const updatedBookings = [...state.bookings];
        updatedBookings.push(action.booking);
        return {
            ...state,
            bookings: updatedBookings,
            currentBookingId: action.booking.id,
            error: ''
        }
    }),
    on(BookingApiActions.createBookingFailure, (state, action): BookingState => {
        return {
            ...state,
            error: action.error
        }
    }),
    on(BookingApiActions.deleteBookingSuccess, (state, action): BookingState =>{
        const updatedBookings = state.bookings.filter(booking => booking.id !== action.id)
        return {
            ...state,
            bookings: updatedBookings,
            currentBookingId: null,
            error: ''
        }
    }),
    on(BookingApiActions.deleteBookingFailure, (state, action): BookingState => {
      return {
        ...state,
        error: action.error
      };
    })
)