export class House {
    constructor(
      public id: string,
      public name: string,
      public cssClass: string,
      public allowBookings: boolean,
      public rate: number
    ) {}
}

export var Houses = [
    new House("1", "Van der Laarses", "house1", false, 0),
    new House("2", "Small Guest House", "house2", true, 150),
    new House("3", "Lombards", "house3", false, 0),
    new House("4", "Bashonepie", "house4", false, 0),
    new House("5", "Big Guest House", "house5", true, 250),
]