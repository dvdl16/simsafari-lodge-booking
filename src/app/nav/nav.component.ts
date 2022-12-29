import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  toggle(nav: MatSidenav) {
    const isSmallScreen = this.breakpointObserver.isMatched(
      Breakpoints.Handset
    );
    if (isSmallScreen) {
      nav.toggle();
    }
  }

  constructor(private breakpointObserver: BreakpointObserver) {}

}
