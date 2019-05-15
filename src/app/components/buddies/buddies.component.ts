import { Component, OnInit } from "@angular/core"
import { BuddiesService } from "./buddies.service";
import { AuthService } from "~/app/auth/auth.service";
import { RouterExtensions } from 'nativescript-angular/router';
import { ItemEventData } from 'tns-core-modules/ui/list-view'
import { NavigationExtras } from "@angular/router";

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
    private router: RouterExtensions,
    private authService: AuthService
  ) {}
  
  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
    })
    this.buddiesService.getBuddies(this.user.id, this.user.firebase)

    this.buddiesService.buddies.subscribe(buddies => {
        this.buddies = buddies;
      console.log('your buddies are', this.buddies);
    })
  }

  chat(buddy){
    console.log('chatting with', buddy);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "id": buddy.id,
        "username": buddy.username,
        "nativeLanguageId": buddy.nativeLanguageId,
        "currentLanguageId": buddy.currentLanguageId
      }
    }

    this.router.navigate(['/messages'], navigationExtras)
  }


 } 
