import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

// Components
import { AppComponent } from './app.component';
import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found.component';

// Shared Modules
import { AuthInterceptorService } from './user/auth-interceptor.service';


// Feature Modules
import { UserModule } from './user/user.module';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { EffectsModule } from '@ngrx/effects';
import { SightingsComponent } from './sightings/sightings.component';
import { CameratrapComponent } from './cameratrap/cameratrap.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BookingData } from './bookings/booking-data';
import { HydrationEffects } from './state/hydration/hydration.effects';
import { metaReducers, reducers } from './state/app.state';
import { ErrorInterceptorService } from './user/auth-error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    NavComponent,
    SightingsComponent,
    CameratrapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    environment.production ? [] : HttpClientInMemoryWebApiModule.forRoot(BookingData),
    UserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ 
      name: 'SimSafari Lodge Booking Devtools',
      maxAge: 25, 
      logOnly: environment.production }),
    EffectsModule.forRoot([HydrationEffects]),
    BrowserAnimationsModule,
    LayoutModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
