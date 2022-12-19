import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../state/app.state';
import * as UserActions from './state/user.actions'

import { User } from './user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // We use the ! symbol to indicate that we are aware that these are not initialized in the constructor and we will handle it elsewhere
    currentUser!: User | null;
    redirectUrl!: string;

    constructor(private store: Store<State>) { }

    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    login(userName: string, password: string): void {
        // Code here would log into a back end service
        // and return user information
        // This is just hard-coded here.
        this.currentUser = {
            id: '2',
            userName,
            isAdmin: false
        };

        // localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.store.dispatch(UserActions.setCurrentUser({ user: this.currentUser }));
    }
    

    logout(): void {
        this.currentUser = null;
    }

    autoLogin() {
        const currentUserFromStorage = localStorage.getItem('currentUser');
        if (!currentUserFromStorage){
            return;
        }
        this.currentUser = JSON.parse(currentUserFromStorage)
        if (!this.currentUser) {
        //   this.router.navigate(['/auth']);
          return;
        }
    
        // // Validate token
        // const loadedUser = new User(
        //   currentUser.email,
        //   currentUser.id,
        //   currentUser._accessToken,
        //   new Date(currentUser._tokenExpirationDate),
        //   currentUser.isActive,
        //   currentUser.isSuperuser,
        //   currentUser.isAdmin,
        //   currentUser.firstName,
        //   currentUser.lastName,
        //   currentUser.vpnAccess
        // );
    
    
        // if (loadedUser.token) {
        //   this.user.next(loadedUser);
        //   const expirationDuration =
        //     new Date(currentUser._tokenExpirationDate).getTime() -
        //     new Date().getTime();
        //   this.autoLogout(expirationDuration);
        //   this.router.navigate(['/user-management']);
        // }
        // else {
        //   this.router.navigate(['/auth']);
        // }
      }
}
