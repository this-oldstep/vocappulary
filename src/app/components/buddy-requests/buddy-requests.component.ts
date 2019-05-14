import { Component, OnInit } from '@angular/core';
import { BuddyRequestsService } from './buddy-requests.service';
import { AuthService } from '~/app/auth/auth.service';

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
    private authService: AuthService
    
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

}
