import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Components
import { BookingsComponent } from "./bookings-shell/bookings-shell.component";
import { HouseCardComponent } from "./house-list/house-card/house-card.component";
import { HouseListComponent } from "./house-list/house-list.component";
import { MapComponent } from "./map/map.component";

// Shared Modules
import { SharedModule } from '../shared/shared.module';

// NgRX
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { BookingEffects } from "./state/booking.effects";
import { bookingReducer } from './state/booking.reducer';
import { BookingEditComponent } from './house-list/booking-edit/booking-edit.component';
import { MAT_DATE_LOCALE } from "@angular/material/core";

const bookingRoutes: Routes = [
    { path: '', component: BookingsComponent }
  ];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(bookingRoutes),
        StoreModule.forFeature('bookings', bookingReducer),
        EffectsModule.forFeature([BookingEffects])
    ],
    declarations: [
        BookingsComponent,
        MapComponent,
        HouseListComponent,
        HouseCardComponent,
        BookingEditComponent
    ],
    providers: [
      {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    ],
  })
export class BookingModule { }
