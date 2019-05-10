import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { HttpClient } from '@angular/common/http';
import { NGROK } from '../../../config'
import { AuthService} from '../../auth/auth.service'
const i18n = require('../../i18n/i18n.js')


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
              private http: HttpClient,
              private authService: AuthService
              ) { }

private language: any;

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
    
    const URL = `${NGROK}/collectionItems`
    console.log('sending to server to save word', chosenWord);
    this.http.post(URL, chosenWord)
      .subscribe( response => {
        console.log('response from server after saving word', response);
        this.modalParams.closeCallback(response);
      })
  }



  ngOnInit() {

    this.authService.user.subscribe(userData => {
      console.log("hello" + userData.nativeLanguageId)
      let langCode = userData.nativeLanguageId.toString()
      if (!langCode) {
        langCode = '1'
      }
      console.log(i18n[langCode])
      this.language = i18n[langCode]
    })


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