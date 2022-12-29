import { Component, Input, OnInit } from '@angular/core';
import { Sighting } from '../sighting.model';

@Component({
  selector: 'app-sightings-list',
  templateUrl: './sightings-list.component.html',
  styleUrls: ['./sightings-list.component.scss']
})
export class SightingsListComponent implements OnInit {
  @Input() loading!: boolean | null
  @Input() sightings!: Sighting[] | null

  constructor() { }

  ngOnInit(): void {
  }

}
