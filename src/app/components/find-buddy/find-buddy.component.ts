import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '~/app/auth/auth.service';
import { findBuddyService } from './find-buddy.service';
import { HttpClient } from '@angular/common/http';
import { NGROK } from '../../../config'
import { ModalDialogService } from 'nativescript-angular/modal-dialog'
import { NoticeComponent } from '../notice/notice.component';
import * as dialogs from "tns-core-modules/ui/dialogs";


const i18n = require('../../i18n/i18n.js')

@Component({
  selector: 'ns-find-buddy',
  templateUrl: './find-buddy.component.html',
  styleUrls: ['./find-buddy.component.css'],
  moduleId: module.id,
})

//const modalViewModulets = "ns-ui-category/modal-view/basics/modal-ts-view-page";


export class FindBuddyComponent implements OnInit {
  user;
  users;
  public notice: string;
  private language: any;


  constructor(
    private authService: AuthService,
    private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef,
    private findBuddyService: findBuddyService,
    private http: HttpClient
  ) {

    this.notice = "Request has been sent"
  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
      let langCode = user.nativeLanguageId.toString()
      if (!langCode) {
        langCode = '1'
      }
      this.language = i18n[langCode]
      this.notice = this.language.noticeSent; // added by patrick
    })

    this.getPotentialBuddies();

  }

  getPotentialBuddies() {
    this.findBuddyService.getPotentialBuddies(this.user.id, this.user.firebase)
    this.findBuddyService.users.subscribe(users => {
      this.users = users;
      console.log('potential buddies', this.users);
    })
  }


  buddyRequest(potentialBuddy) {
    console.log('wanna be budies with', potentialBuddy);
    this.http.post(`${NGROK}/requests/new`,
     {userId: this.user.id, 
      potentialBuddyId: potentialBuddy.id,
      firebase: this.user.firebase,
    })
      .subscribe(response => {
        console.log(response);
        dialogs.alert({
          title: '',
          message: this.notice,
          okButtonText: 'Ok'
        })
        this.getPotentialBuddies();
      })

  
  }

  // openModal(){
  //   let notice = {
  //     notice: this.notice
  //   }

  //   this.modalDialog.showModal(NoticeComponent, {
  //     fullscreen: false,
  //     viewContainerRef: this.vcRef,
  //     context: {
  //       notice: notice
  //     }
  //   })
  //     .then(action => {
  //       console.log(action);
  //       this.getPotentialBuddies();
  //     })
  // }


}
