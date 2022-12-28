export class Booking {
    constructor(
      public id: string,
      public userId: string,
      public fromDate: string,
      public toDate: string,
      public house: number,
      public guestDetails: string,
    ) {}
}

export class NewBookingData {
  constructor(
    public fromDate: string,
    public toDate: string,
    public house: number,
    public guestDetails: string,
  ) {}
}