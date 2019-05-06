import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { HttpClient } from '@angular/common/http';


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

public imgUrl: string;
public collectionId: any;

  constructor(private modalParams: ModalDialogParams,
              private http: HttpClient,) { }

  onWordSelection(action: any){
    
    let chosenWord: {
      imgUrl: string,
      wordId: number,
      collectionId: number,
    } = {
      imgUrl: this.imgUrl,
      wordId: action,
      collectionId: this.collectionId
    }
    
    const URL = "https://bfb22891.ngrok.io/collectionItems"
    console.log('sending to server to save word', chosenWord);
    this.http.post(URL, chosenWord)
      .subscribe( response => {
        console.log('response from server after saving word', response);
        this.modalParams.closeCallback(response);
      })
  }



  ngOnInit() {
    console.log(this.modalParams.context);
    this.collectionId = this.modalParams.context.collectionId;
    this.imgUrl = this.modalParams.context.imgUrl;
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