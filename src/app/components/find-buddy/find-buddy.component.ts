import { Component, OnInit } from '@angular/core';
import { AuthService } from '~/app/auth/auth.service';

@Component({
  selector: 'ns-find-buddy',
  templateUrl: './find-buddy.component.html',
  styleUrls: ['./find-buddy.component.css'],
  moduleId: module.id,
})
export class FindBuddyComponent implements OnInit {
  user;
  constructor(
    private authService: AuthService,

  ) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
    })
    
  }

}
