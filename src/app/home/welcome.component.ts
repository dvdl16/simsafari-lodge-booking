import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service';
import { InformationDialogComponent } from './information-dialog/information-dialog.component';

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
    constructor(private breakpointObserver: BreakpointObserver,
                private authService: AuthService,
                public dialog: MatDialog) {
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

      logOut(): void {
        this.authService.logout();
        window.location.reload();
      }

      openDialog(): void {
        const dialogRef = this.dialog.open(InformationDialogComponent);
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }

}