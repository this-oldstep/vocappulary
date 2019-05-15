import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../auth/auth.service"
const i18n = require('../../i18n/i18n.js')
@Component({
  selector: 'ns-buddies-tab',
  templateUrl: './buddies-tab.component.html',
  styleUrls: ['./buddies-tab.component.css'],
  moduleId: module.id,
})
export class BuddiesTabComponent implements OnInit {
  private user: any;
  private language: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.user.subscribe(userData => {
      this.user = userData;
      let langCode = userData.nativeLanguageId.toString()
      if (!langCode) {
        langCode = '1'
      }
      this.language = i18n[langCode]
    })
  }

}
