import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{

    public cols!: number;
  
    gridByBreakpoint = {
      xl: 2,
      lg: 2,
      md: 2,
      sm: 1,
      xs: 1
    }

    // Adjust grid based on screen size
    constructor(private breakpointObserver: BreakpointObserver) {
        this.breakpointObserver.observe([
          Breakpoints.XSmall,
          Breakpoints.Small,
          Breakpoints.Medium,
          Breakpoints.Large,
          Breakpoints.XLarge,
        ]).subscribe(result => {
          if (result.matches) {
            if (result.breakpoints[Breakpoints.XSmall]) {
              this.cols = this.gridByBreakpoint.xs;
            }
            if (result.breakpoints[Breakpoints.Small]) {
              this.cols = this.gridByBreakpoint.sm;
            }
            if (result.breakpoints[Breakpoints.Medium]) {
              this.cols = this.gridByBreakpoint.md;
            }
            if (result.breakpoints[Breakpoints.Large]) {
              this.cols = this.gridByBreakpoint.lg;
            }
            if (result.breakpoints[Breakpoints.XLarge]) {
              this.cols = this.gridByBreakpoint.xl;
            }
          }
        });
      }
    
      ngOnInit() {
      }
}