import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { Sighting } from './sighting.model';
import { getSightings, isSightingsLoading, State } from './state';
import { SightingPageActions } from './state/actions';

@Component({
    selector: 'app-sightings',
    templateUrl: './sightings.component.html',
    styleUrls: ['./sightings.component.scss'],
    standalone: false
})
export class SightingsComponent implements OnInit {
  sightings$!: Observable<Sighting[]>;
  loading$!: Observable<boolean>

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(SightingPageActions.loadSightings());
    this.sightings$ = this.getAndSortSightings();
    this.loading$ = this.store.select(isSightingsLoading);
  }

  getAndSortSightings(): Observable<Sighting[]> {
      return this.store.select(getSightings).pipe(
        map(results => results.slice().sort((a,b) => b.observed_on.localeCompare(a.observed_on)))
      );
  }


}
