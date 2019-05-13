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

    getRequests(userId: number) {
        return this.http.get(
            `${NGROK}/requests/all/${userId}`
        ).subscribe(response => {
            this._requests.next(response);
            console.log(response)
        } )
    }
}