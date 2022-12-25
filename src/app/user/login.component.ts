import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { State } from '../state/app.state';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';

  maskUserName!: boolean;
  maskUserName$!: Observable<boolean>;


  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const urlParams = new URLSearchParams(fragment);
        const idToken = urlParams.get("id_token")
        // const accessToken = urlParams.get("access_token")
        // const expiresIn = urlParams.get("expires_in")
        // const tokenType = urlParams.get("token_type")

        if (idToken) {
          if (this.authService.autoLogin(idToken)) {
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
            } else {
              this.router.navigate(['/welcome']);
            }
          }
          else {
            this.pageTitle = "Session expired"
            this.cancel();
          }
        }
      }
    })
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }
}
