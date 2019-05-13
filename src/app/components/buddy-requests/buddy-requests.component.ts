import { Component, OnInit } from '@angular/core';
import { BuddyRequestsService } from './buddy-requests.service';
import { AuthService } from '~/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';


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
    this.buddyRequestsService.getRequests(this.user.id);
    this.buddyRequestsService.requests.subscribe(currentRequests => {
      this.requests = currentRequests;
    })
  }

  acceptRequest(request){
    console.log(request);

    this.http.post(`${NGROK}/requests/accept`, {userId: this.user.id, newBuddyId: })
      .subscribe( response => {

      })


  }


}
