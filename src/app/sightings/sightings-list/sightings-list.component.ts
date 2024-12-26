import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Sighting } from '../sighting.model';

@Component({
    selector: 'app-sightings-list',
    templateUrl: './sightings-list.component.html',
    styleUrls: ['./sightings-list.component.scss'],
    standalone: false
})
export class SightingsListComponent implements OnInit {
  @Input() loading!: boolean | null
  @Input() sightings!: Sighting[] | null

  public cols!: number;

  gridByBreakpoint = {
    xl: 4,
    lg: 3,
    md: 2,
    sm: 2,
    xs: 1
  }

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
        }
      }
    });
  }

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
