import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

// Components
import { AppComponent } from './app.component';
import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found.component';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';


// Feature Modules
import { UserModule } from './user/user.module';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { EffectsModule } from '@ngrx/effects';
import { SightingsComponent } from './sightings/sightings.component';
import { CameratrapComponent } from './cameratrap/cameratrap.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BookingData } from './bookings/booking-data';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    NavComponent,
    BookingsComponent,
    SightingsComponent,
    CameratrapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(BookingData),
    UserModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ 
      name: 'SimSafari Lodge Booking Devtools',
      maxAge: 25, 
      logOnly: environment.production }),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
