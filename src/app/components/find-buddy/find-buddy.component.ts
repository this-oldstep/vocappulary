import { Component, OnInit } from '@angular/core';
import { AuthService } from '~/app/auth/auth.service';
import { findBuddyService } from './find-buddy.service';
import { HttpClient } from '@angular/common/http';
import { NGROK } from '../../../config'


@Component({
  selector: 'ns-find-buddy',
  templateUrl: './find-buddy.component.html',
  styleUrls: ['./find-buddy.component.css'],
  moduleId: module.id,
})
export class FindBuddyComponent implements OnInit {
  user;
  users;
  constructor(
    private authService: AuthService,
    private findBuddyService: findBuddyService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
    })
    this.findBuddyService.getPotentialBuddies(this.user.id)
    this.findBuddyService.users.subscribe(users => {
      this.users = users;
      console.log('potential buddies', this.users);
    })
  }

  buddyRequest(potentialBuddy){
    console.log('wanna be budies with', potentialBuddy);
    this.http.post(`${NGROK}/requests/new`,
     {userId: this.user.id, 
      potentialBuddyId: potentialBuddy.id})
      .subscribe(response => {
        console.log(response);
      })

  }

}
