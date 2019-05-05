import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';


@Component({
  selector: 'ns-select-word',
  templateUrl: './select-word.component.html',
  styleUrls: ['./select-word.component.css'],
  moduleId: module.id,
})

export class SelectWordComponent implements OnInit {

  public words: {
    data: [
  { wordId: number
   translationId: number
   languageId: number
   text: string
  },
  { wordId: number
   translationId: number
   languageId: number
   text: string
  },
  { wordId: number
   translationId: number
   languageId: number
   text: string
  },
  { wordId: number
   translationId: number
   languageId: number
   text: string
  },
  { wordId: number
   translationId: number
   languageId: number
   text: string
  }
],
imgUrl: string
}

  constructor(private modalParams: ModalDialogParams) { }

  ngOnInit() {
    console.log(this.modalParams.context.data);
    this.words = this.modalParams.context.data as {
      data: [
      {
        wordId: number
        translationId: number
        languageId: number
        text: string
      },
      {
        wordId: number
        translationId: number
        languageId: number
        text: string
      },
      {
        wordId: number
        translationId: number
        languageId: number
        text: string
      },
      {
        wordId: number
        translationId: number
        languageId: number
        text: string
      },
      {
        wordId: number
        translationId: number
        languageId: number
        text: string
      }
    ],
  imgUrl: string
  }
}

}