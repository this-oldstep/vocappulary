import { Component, OnInit, Input } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  selector: 'ns-lang-modal',
  templateUrl: './lang-modal.component.html',
  styleUrls: ['./lang-modal.component.css'],
  moduleId: module.id,
})
export class LangModalComponent implements OnInit {

  public pickedLang = "English";
  public pickedLangId = 1;

  constructor(
    private modalParams: ModalDialogParams,
    
    ) { }

  ngOnInit() {

  }
  
  onSelectLang(item: Array<any>) {
    this.pickedLang = item[0];
    this.pickedLangId = item[1];
    console.log(this.pickedLang, 'modal');
  }

  closeModal() {
    this.modalParams.closeCallback([this.pickedLang, this.pickedLangId]);
  }
}
