import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Sighting } from './sighting.model';
import { getSightings, isSightingsLoading, State } from './state';
import { SightingPageActions } from './state/actions';

@Component({
  selector: 'app-sightings',
  templateUrl: './sightings.component.html',
  styleUrls: ['./sightings.component.scss']
})
export class SightingsComponent implements OnInit {
  sightings$!: Observable<Sighting[]>;
  loading$!: Observable<boolean>

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(SightingPageActions.loadSightings());
    this.sightings$ = this.store.select(getSightings);
    this.loading$ = this.store.select(isSightingsLoading);
  }


}
