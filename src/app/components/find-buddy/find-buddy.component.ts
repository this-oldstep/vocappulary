import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '~/app/auth/auth.service';
import { findBuddyService } from './find-buddy.service';
import { HttpClient } from '@angular/common/http';
import { NGROK } from '../../../config'
import { ModalDialogService, ModalDialogParams } from 'nativescript-angular/modal-dialog'
import { NoticeComponent } from '../notice/notice.component'

@Component({
  selector: 'ns-find-buddy',
  templateUrl: './find-buddy.component.html',
  styleUrls: ['./find-buddy.component.css'],
  moduleId: module.id,
})
export class FindBuddyComponent implements OnInit {
  user;
  users;
  public notice: string;
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
    })

    this.getPotentialBuddies();

  }

  getPotentialBuddies() {
    this.findBuddyService.getPotentialBuddies(this.user.id)
    this.findBuddyService.users.subscribe(users => {
      this.users = users;
      console.log('potential buddies', this.users);
    })
  }


  buddyRequest(potentialBuddy) {
    console.log('wanna be budies with', potentialBuddy);
    this.http.post(`${NGROK}/requests/new`,
      {
        userId: this.user.id,
        potentialBuddyId: potentialBuddy.id
      })
      .subscribe(response => {
        console.log(response);
        this.modalDialog.showModal(NoticeComponent, {
          fullscreen: false,
          viewContainerRef: this.vcRef,
          context: {
            notice: this.notice
          }
        })
          .then(action => {
            this.getPotentialBuddies();
          })
      })

  }

}
