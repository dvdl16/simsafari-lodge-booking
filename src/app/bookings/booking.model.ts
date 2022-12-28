export class Booking {
    constructor(
      public id: string,
      public userId: string,
      public fromDate: string,
      public toDate: string,
      public Houses: string[],
      public guestDetails: string,
      public userContact: string,
      public userName: string
    ) {}
}