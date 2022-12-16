import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Booking } from './booking.model';


export class BookingData implements InMemoryDbService {

    createDb() {
        const bookings: Booking[] = [
            {
                bookingId: "2b1f8173-32e7-41b0-b631-0f8918026e3d",
                userId: "a_user",
                fromDate: "2022-12-16",
                toDate: "2022-12-17",
                house: 1,
                guestDetails: 'family and friends',
            },
            {
                bookingId: "984dec27-8138-462a-afbf-c17dee05e535",
                userId: "a_user",
                fromDate: "2022-12-17",
                toDate: "2022-12-18",
                house: 4,
                guestDetails: 'party',
            },
            {
                bookingId: "c2e7b55b-48e1-4689-8c77-7c27ebf81272",
                userId: "a_user",
                fromDate: "2022-12-25",
                toDate: "2022-12-29",
                house: 2,
                guestDetails: 'christmas',
            },
            {
                bookingId: "6a401ccc-053d-4027-830b-c320cbe282f0",
                userId: "a_user",
                fromDate: "2022-12-30",
                toDate: "2022-12-31",
                house: 5,
                guestDetails: 'vacation',
            },
            {
                bookingId: "aabae71b-4d54-4500-93fa-424073fc5839",
                userId: "a_user",
                fromDate: "2022-12-31",
                toDate: "2023-01-01",
                house: 9,
                guestDetails: 'yes',
            },
        ];
        return { bookings };
    }
}
