import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const FIREBASE_API_KEY = 'AIzaSyC8WpwuQBkU6xoVHnoZ59xyDk9pdvFNeR0'

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
        this.http.post(
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${FIREBASE_API_KEY}`
            , {email: email, password: password, returnSecureToken: true}
            ).subscribe(resData => {
                console.log(resData);
            });
        }
    login(email: string, password: string) {

    }
}