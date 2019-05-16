import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { NGROK } from '../../../config';
import { BuddiesService } from "../buddies/buddies.service";

@Injectable({providedIn: 'root'})
export class BuddyRequestsService {
    private _requests = new BehaviorSubject(null);

    constructor(
        private http: HttpClient,
        private buddiesService: BuddiesService,
        ) {}

    get requests () {
        return this._requests.asObservable();
    }

    getRequests(userId, firebase) {
        return this.http.get(
            `${NGROK}/requests/all`,  {
                params: {
                    id: userId,
                    firebase: firebase,
                }
            }
        ).subscribe(response => {
            this._requests.next(response);
            this.buddiesService.getBuddies(userId, firebase);
            console.log(response)
        } )
    }
}