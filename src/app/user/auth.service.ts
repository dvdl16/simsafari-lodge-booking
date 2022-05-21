import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // We use the ! symbol to indicate that we are aware that these are not initialized in the constructor and we will handle it elsewhere
    currentUser!: User | null;
    redirectUrl!: string;

    constructor() { }

    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    login(userName: string, password: string): void {
        // Code here would log into a back end service
        // and return user information
        // This is just hard-coded here.
        this.currentUser = {
            id: 2,
            userName,
            isAdmin: false
        };
    }

    logout(): void {
        this.currentUser = null;
    }
}
