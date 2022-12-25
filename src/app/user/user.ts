/* Defines the user entity */
export interface User {
    userId: string;
    email: string;
    phone: string | null;
    name: string;
    token: string;
}