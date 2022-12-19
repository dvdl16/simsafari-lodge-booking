export class Booking {
    constructor(
      public bookingId: string,
      public userId: string,
      public fromDate: string,
      public toDate: string,
      public house: number,
      public guestDetails: string,
    ) {}
}

export class newBookingData {
  constructor(
    public fromDate: string,
    public toDate: string,
    public house: number,
    public guestDetails: string,
  ) {}
}