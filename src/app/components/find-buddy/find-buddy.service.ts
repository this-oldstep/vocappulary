import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { NGROK } from "../../../config"

@Injectable({providedIn: 'root'})
export class findBuddyService {
    private _users = new BehaviorSubject(null);

    constructor(private http: HttpClient) {}

    get users() {
        return this._users.asObservable();
    }

    getPotentialBuddies(userId: number) {
        return this.http.get(
            `${NGROK}/requests/potential/${userId}`
        ).subscribe(response => {
            this._users.next(response);
            console.log(response, "null");
        })
    }
}