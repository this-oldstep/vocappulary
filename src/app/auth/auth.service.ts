import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { alert } from 'tns-core-modules/ui/dialogs'
import { User } from './user.model';
import {NGROK, FIREBASE_API_KEY} from '../../config';


// const FIREBASE_API_KEY = 'AIzaSyC8WpwuQBkU6xoVHnoZ59xyDk9pdvFNeR0'

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: number;
    registered?: boolean;
}

interface VocappResponseData {
    username: any;
    points: number;
    nativeLanguageId: number;
    currentLanguageId: number;
    id: number;
    email: string;

}

@Injectable({providedIn: 'root'})
export class AuthService {
    private _user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient ) {}

    get user() {
        return this._user.asObservable();
    }

    signUp(email: string, password: string, natLangId: number, learnLangId: number, username: string) {
        console.log("hit");
       return this.http.post<AuthResponseData>(
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${FIREBASE_API_KEY}`
            , {email: email, password: password, returnSecureToken: true}
            ).toPromise().then((resData) => {
                if (resData && resData.idToken) {
                    this.handleLogin(email, resData.idToken, resData.localId, username, natLangId, learnLangId, parseInt(resData.expiresIn), true);
                }
            }).catch((errorRes) => {
                this.handleError(errorRes.error.error.message)
                return errorRes;
            });
        }
    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${FIREBASE_API_KEY}`
            , {email: email, password: password, returnSecureToken: true}
            ).toPromise().then((resData) => {
                if (resData && resData.idToken) {
                    this.handleLogin(email, resData.idToken, resData.localId, null, null, null, parseInt(resData.expiresIn), false);
                }
            }).catch((errorRes) => {
                this.handleError(errorRes.error.error.message)
                return errorRes;
            });
            // (catchError(errorRes => {
            //     this.handleError(errorRes.error.error.message)
            //     return throwError(errorRes);
            // }),
            // tap(resData => {
            //     if (resData && resData.idToken) {
            //         this.handleLogin(email, resData.idToken, resData.localId, parseInt(resData.expiresIn), false);
            //     }
            // }))
    }

    private handleLogin(email: string, token: string, userId: number, username: string, natLang: number, learnLang: number, expiresIn: number, newUser: boolean) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        console.log(natLang);
        return this.http.post<VocappResponseData>(`${NGROK}/auth/`, 
        {token: token, email: email, userId: userId, expiresIn: expiresIn, currentLanguageId: learnLang, nativeLanguageId: natLang, username: username, newUser: newUser}
        ).subscribe(response => {
            email = response.email;
            userId = response.id;
            const currentLanguageId = response.currentLanguageId;
            const nativeLanguageId = response.nativeLanguageId;
            const points = response.points;
            const username = response.username;
            const user = new User(email, userId, username, currentLanguageId, nativeLanguageId, points, token, expirationDate,  );
            this._user.next(user);
        })
        
        
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

    updateUser(user: User) {
        this._user.next(user);
    }
}