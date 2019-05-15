import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';



@Component({
  selector: 'ns-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css'],
  moduleId: module.id,
})
export class NoticeComponent implements OnInit {

  public notice: string;

  constructor(private modalParams: ModalDialogParams) { }


  ngOnInit() {
    this.notice = this.modalParams.context.notice
  }

  close() {
    this.modalParams.closeCallback();
  }

}
