import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Booking } from './booking.model';

@Injectable({
    providedIn: 'root'
  })

export class BookingData implements InMemoryDbService {

    createDb() {
        const bookings: Booking[] = [
            {
                id: "2b1f8173-32e7-41b0-b631-0f8918026e3d",
                userId: "a_user",
                fromDate: "2022-12-16",
                toDate: "2022-12-17",
                Houses: ["1"],
                guestDetails: 'family and friends',
                userContact: "test@example.com",
                userName: "Jane"
            },
            {
                id: "984dec27-8138-462a-afbf-c17dee05e535",
                userId: "a_user",
                fromDate: "2022-12-17",
                toDate: "2022-12-18",
                Houses: ["4"],
                guestDetails: 'party',
                userContact: "test@example.com",
                userName: "Jane"
            },
            {
                id: "c2e7b55b-48e1-4689-8c77-7c27ebf81272",
                userId: "a_user",
                fromDate: "2022-12-25",
                toDate: "2022-12-29",
                Houses: ["2"],
                guestDetails: 'christmas',
                userContact: "test@example.com",
                userName: "Jane"
            },
            {
                id: "c2e7b55b-48e1-4689-8c77-7c27ebf81273",
                userId: "a_user",
                fromDate: "2023-01-03",
                toDate: "2023-01-06",
                Houses: ["2"],
                guestDetails: 'new years',
                userContact: "test@example.com",
                userName: "Jane"
            },
            {
                id: "6a401ccc-053d-4027-830b-c320cbe282f0",
                userId: "a_user",
                fromDate: "2022-12-30",
                toDate: "2022-12-31",
                Houses: ["5"],
                guestDetails: 'vacation',
                userContact: "test@example.com",
                userName: "Jane"
            },
            {
                id: "aabae71b-4d54-4500-93fa-424073fc5839",
                userId: "a_user",
                fromDate: "2022-12-31",
                toDate: "2023-01-01",
                Houses: ["9"],
                guestDetails: 'yes',
                userContact: "test@example.com",
                userName: "Jane"
            },
        ];
        return { bookings };
    }

    genId(bookings: Booking[]): string {
        return randomString(40, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }
}

function randomString(length: number, chars: string) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}