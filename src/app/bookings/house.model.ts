export class House {
    constructor(
      public id: string,
      public name: string,
      public cssClass: string,
      public allowBookings: boolean
    ) {}
}

export var Houses = [
    new House("1", "Van der Laarse", "house1", false),
    new House("2", "Small Guest House", "house2", true),
    new House("3", "Lombards", "house3", false),
    new House("4", "Rondavel", "house4", false),
    new House("5", "Big Guest House", "house5", true),
]