import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Components
import { SightingsComponent } from "./sightings.component";

// Shared Modules
import { SharedModule } from '../shared/shared.module';

// NgRX
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SightingEffects } from "./state/sighting.effects";
import { sightingReducer } from './state/sighting.reducer';
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { SightingsListComponent } from './sightings-list/sightings-list.component';

const bookingRoutes: Routes = [
    { path: '', component: SightingsComponent }
  ];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(bookingRoutes),
        StoreModule.forFeature('sightings', sightingReducer),
        EffectsModule.forFeature([SightingEffects]),
    ],
    declarations: [
        SightingsComponent,
        SightingsListComponent
    ],
    providers: [
      {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    ],
  })
export class SightingModule { }
