import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './user/auth-guard.service';

import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found.component';
import { BookingsComponent } from './bookings/bookings-shell/bookings-shell.component';
import { SightingsComponent } from './sightings/sightings.component';
import { CameratrapComponent } from './cameratrap/cameratrap.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      // {
      //   path: 'products',
      //   // canActivate: [AuthGuard],
      //   loadChildren: () =>
      //     import('./products/product.module').then(m => m.ProductModule)
      // },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      {
        path: 'bookings',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./bookings/booking.module').then(m => m.BookingModule)
      },
      { path: 'sightings', component: SightingsComponent},
      { path: 'camera-trap', component: CameratrapComponent}
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
