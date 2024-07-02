import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

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
import { TrailsMapComponent } from './trailsmap/trailsmap.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BookingData } from './shared/data/dummy-data';
import { HydrationEffects } from './state/hydration/hydration.effects';
import { metaReducers, reducers } from './state/app.state';
import { ErrorInterceptorService } from './user/auth-error-interceptor.service';
import { ScriptService } from './_helpers/script.service';
import { InformationDialogComponent } from './home/information-dialog/information-dialog.component';

@NgModule({ declarations: [
        AppComponent,
        ShellComponent,
        WelcomeComponent,
        PageNotFoundComponent,
        NavComponent,
        TrailsMapComponent,
        InformationDialogComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        environment.production ? [] : HttpClientInMemoryWebApiModule.forRoot(BookingData, {
            delay: 2000
        }),
        UserModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreDevtoolsModule.instrument({
            name: 'SimSafari Lodge Booking Devtools',
            maxAge: 25,
            logOnly: environment.production, connectInZone: true
        }),
        EffectsModule.forRoot([HydrationEffects]),
        BrowserAnimationsModule,
        LayoutModule,
        SharedModule], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptorService,
            multi: true
        },
        ScriptService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
