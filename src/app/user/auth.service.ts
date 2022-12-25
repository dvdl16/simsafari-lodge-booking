import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { JwtHelperService } from '@auth0/angular-jwt';

import { State } from '../state/app.state';
import * as UserActions from './state/user.actions'


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // We use the ! symbol to indicate that we are aware that these are not initialized in the constructor and we will handle it elsewhere
    redirectUrl!: string;

    constructor(private store: Store<State>) { }

    autoLogin(token: string): boolean {
        const jwtHelper = new JwtHelperService();

        const decodedToken = jwtHelper.decodeToken(token);
        const isExpired = jwtHelper.isTokenExpired(token);
        // const expirationDate = jwtHelper.getTokenExpirationDate(token);

        if (!isExpired && decodedToken) {
            const currentUser = {
                userId: decodedToken['cognito:username'],
                email: decodedToken['email'],
                phone: decodedToken['phone'],
                name: decodedToken['name'],
                token: token
            };
            this.store.dispatch(UserActions.setCurrentUser({ user: currentUser }));
            return true;
        }
        return false;
    }

    logout(): void {
        this.store.dispatch(UserActions.setCurrentUser({ user: null }));
    }
}
