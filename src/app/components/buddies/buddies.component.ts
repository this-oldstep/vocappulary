import { Component, OnInit } from "@angular/core"
import { BuddiesService } from "./buddies.service";
import { AuthService } from "~/app/auth/auth.service";

@Component({
  selector: 'ns-buddies',
  templateUrl: './buddies.component.html',
  styleUrls: ['/buddies.component.css'],
  moduleId: module.id
})
export class BuddiesComponent implements OnInit {
  user;
  buddies;
  constructor(
    private buddiesService: BuddiesService,
    private authService: AuthService
  ) {}
  
  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
    })
    this.buddiesService.getBuddies(this.user.id)

    this.buddiesService.buddies.subscribe(buddies => {
      this.buddies = buddies;
    })


  }
 } 
