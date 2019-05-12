import { Component, OnInit } from '@angular/core';
import { AuthService } from '~/app/auth/auth.service';
import { findBuddyService } from './find-buddy.service';

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

  ) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
    })
    this.findBuddyService.getPotentialBuddies(this.user.id)
    this.findBuddyService.users.subscribe(users => {
      this.users = users;
      console.log(this.users);
    })


  }

}
