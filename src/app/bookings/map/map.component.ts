import { Component, Input, OnInit } from '@angular/core';
import { House } from '../house.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    @Input() selectedHouse!: House;

  constructor() {
  }

  ngOnInit(): void {
  }

}
