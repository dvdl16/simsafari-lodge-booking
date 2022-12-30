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

  getCommonName(sighting: Sighting): string {
    if (sighting.taxon && sighting.taxon?.common_name && sighting.taxon?.common_name?.name) {
      return sighting.taxon.common_name.name;
    }
    else {
      return "Unidentified";
    }
  }

}
