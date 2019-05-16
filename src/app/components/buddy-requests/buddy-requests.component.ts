import { Component, OnInit } from '@angular/core';
import { BuddyRequestsService } from './buddy-requests.service';
import { AuthService } from '~/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { NGROK } from '../../../config';
import * as dialogs from "tns-core-modules/ui/dialogs";
const i18n = require('../../i18n/i18n.js')


@Component({
  selector: 'ns-buddy-requests',
  templateUrl: './buddy-requests.component.html',
  styleUrls: ['./buddy-requests.component.css'],
  moduleId: module.id,
})
export class BuddyRequestsComponent implements OnInit {
  
  user;
  requests;
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
    private buddyRequestsService: BuddyRequestsService,
    private authService: AuthService,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.authService.user.subscribe(currentUser => {
      this.user = currentUser;
      let langCode = currentUser.nativeLanguageId.toString()
      if (!langCode) {
        langCode = '1'
      }
      this.language = i18n[langCode]
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
          message: this.language.acceptedReq,
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
          message: this.language.rejectedReq,
          okButtonText: 'Ok'
        });
        this.getRequests();
      })

  }


}
