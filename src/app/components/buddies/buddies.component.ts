import { Component, OnInit } from "@angular/core"
import { BuddiesService } from "./buddies.service";
import { AuthService } from "~/app/auth/auth.service";
import { RouterExtensions } from 'nativescript-angular/router';
import { ItemEventData } from 'tns-core-modules/ui/list-view'
import { NavigationExtras } from "@angular/router";
const i18n = require('../../i18n/i18n.js')

@Component({
  selector: 'ns-buddies',
  templateUrl: './buddies.component.html',
  styleUrls: ['/buddies.component.css'],
  moduleId: module.id
})
export class BuddiesComponent implements OnInit {
  user;
  buddies;
  public language: any;

  public languages: any = {
    1: "English",
    2: "Español",
    3: "Português",
    4: "Italiano",
    5: "Français",
    6: "Deutsche",
    7: "Dansk",
    8: "Swahili",
    9: "Tagalog",
    10: "Tiếng Việt",
    11: "Türk",
    12: "Euskara",
    13: "Zulu",
  }


  constructor(
    private buddiesService: BuddiesService,
    private router: RouterExtensions,
    private authService: AuthService
  ) {}
  
  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
      let langCode = user.nativeLanguageId.toString()
      if (!langCode) {
        langCode = '1'
      }
      this.language = i18n[langCode]
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
