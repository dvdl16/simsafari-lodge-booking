export class Payment {
    constructor(
      public nameFirst: string,
      public emailAddress: string,
      public mPaymentId: string,
      public amount: string,
      public itemName: string,
      public itemDescription: string,
      public customStr1: string,
    ) {}
}

export class PaymentResult {
  constructor(
    public identifier: string
  ) {}
}