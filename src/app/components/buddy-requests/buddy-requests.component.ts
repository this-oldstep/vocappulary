import { Component, OnInit } from '@angular/core';
import { BuddyRequestsService } from './buddy-requests.service';
import { AuthService } from '~/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { NGROK } from '../../../config';
import * as dialogs from "tns-core-modules/ui/dialogs";


@Component({
  selector: 'ns-buddy-requests',
  templateUrl: './buddy-requests.component.html',
  styleUrls: ['./buddy-requests.component.css'],
  moduleId: module.id,
})
export class BuddyRequestsComponent implements OnInit {
  
  user;
  requests;

  constructor(
    private buddyRequestsService: BuddyRequestsService,
    private authService: AuthService,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.authService.user.subscribe(currentUser => {
      this.user = currentUser;
    })
    this.getRequests();
  }

  getRequests(){
    this.buddyRequestsService.getRequests(this.user.id, this.user.firebase);
    this.buddyRequestsService.requests.subscribe(currentRequests => {
      this.requests = currentRequests;
    });
  }


  acceptRequest(request){
    console.log(request);

    this.http.post(`${NGROK}/requests/accept`, {userId: this.user.id, newBuddyId: request.id, firebase: this.user.firebase })
      .subscribe( response => {
        console.log('response from server', response);
        dialogs.alert({
          title: '',
          message: 'Buddy Accepted',
          okButtonText: 'Ok'
        });
        this.getRequests();
      })

  }

  rejectRequest(request){
    console.log(request);

    this.http.post(`${NGROK}/requests/reject`, {userId: this.user.id, rejectedBuddyId: request.id, firebase: this.user.firebase })
      .subscribe( response => {
        console.log('response from server', response);
        dialogs.alert({
          title: '',
          message: 'Buddy Rejected',
          okButtonText: 'Ok'
        });
        this.getRequests();
      })

  }


}
