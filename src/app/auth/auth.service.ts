import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { alert } from 'tns-core-modules/ui/dialogs'
import { User } from './user.model';

const FIREBASE_API_KEY = 'AIzaSyC8WpwuQBkU6xoVHnoZ59xyDk9pdvFNeR0'

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    private _user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient) {}

    get user() {
        return this._user.asObservable();
    }

    signUp(email: string, password: string) {
       return this.http.post<AuthResponseData>(
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${FIREBASE_API_KEY}`
            , {email: email, password: password, returnSecureToken: true}
            ).pipe(catchError(errorRes => {
                this.handleError(errorRes.error.error.message)
                return throwError(errorRes);
            }),
            tap(resData => {
                if (resData && resData.idToken) {
                    this.handleLogin(email, resData.idToken, resData.localId, parseInt(resData.expiresIn));
                }
            })
            );
        }
    login(email: string, password: string) {
       return this.http.post<AuthResponseData>(
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${FIREBASE_API_KEY}`
            , {email: email, password: password, returnSecureToken: true}
            ).pipe(catchError(errorRes => {
                this.handleError(errorRes.error.error.message)
                return throwError(errorRes);
            }),
            tap(resData => {
                if (resData && resData.idToken) {
                    this.handleLogin(email, resData.idToken, resData.localId, parseInt(resData.expiresIn));
                }
            }))
    }

    private handleLogin(email: string, token: string, userId: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.http.post('https://39f4d42f.ngrok.io/auth/', 
        {token: token, email: email, userId: userId, expiresIn: expiresIn}
        ).subscribe(response => {
            console.log(response);
        })
        this._user.next(user);
        console.log(this._user);
    }

    private handleError(errorMessage: string) {
        switch (errorMessage) {
            case 'EMAIL_EXISTS': 
                alert('This email address exists already!');
                break;
            case 'INVALID_PASSWORD':
            alert('Invalid Password');
            break;
            default:
            alert('Authentication failed, check your credentials');
        }
    }
}