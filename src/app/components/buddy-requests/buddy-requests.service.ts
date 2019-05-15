import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { NGROK } from '../../../config';

@Injectable({providedIn: 'root'})
export class BuddyRequestsService {
    private _requests = new BehaviorSubject(null);

    constructor(private http: HttpClient) {}

    get requests () {
        return this._requests.asObservable();
    }

    getRequests(userId, firebase) {
        console.log("1231233")
        return this.http.get(
            `${NGROK}/requests/all`,  {
                params: {
                    id: userId,
                    firebase: firebase,
                }
            }
        ).subscribe(response => {
            this._requests.next(response);
            console.log(response)
        } )
    }
}