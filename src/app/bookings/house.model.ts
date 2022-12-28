export class House {
    constructor(
      public id: string,
      public name: string,
      public cssClass: string,
    ) {}
}

export var Houses = [
    new House("1", "Van der Laarse", "house1"),
    new House("2", "Small Guest House", "house2"),
    new House("3", "Lombards", "house3"),
    new House("4", "Rondavel", "house4"),
    new House("5", "Big Guest House", "house5"),
]