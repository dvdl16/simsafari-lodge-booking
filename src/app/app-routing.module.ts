import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './user/auth-guard.service';

import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found.component';
import { TrailsMapComponent } from './trailsmap/trailsmap.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent,canActivate: [AuthGuard] },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      {
        path: 'bookings',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./bookings/booking.module').then(m => m.BookingModule)
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then(m => m.UserModule)
      },
      { path: 'sightings',
      canActivate: [AuthGuard],
        loadChildren: () =>
          import('./sightings/sighting.module').then(m => m.SightingModule) 
      },
      { path: 'trails-map', component: TrailsMapComponent}
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
