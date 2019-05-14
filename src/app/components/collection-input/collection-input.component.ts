
import { Component,  EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '~/app/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { NGROK } from '../../../config';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
const i18n = require('../../i18n/i18n.js');
import * as app from 'tns-core-modules/application';
import { isAndroid } from 'platform';

@Injectable()
@Component({
  selector: 'ns-collection-input',
  templateUrl: './collection-input.component.html',
  styleUrls: ['./collection-input.component.css'],
  moduleId: module.id,
})
export class CollectionInputComponent implements OnInit  {
  user;
  collectionDescription = "";
  currentCollection = '';
  isLoading = false;

  constructor(private http: HttpClient,
              private authService: AuthService,) {}

    private language: any; 


  @Output() input = new EventEmitter <Object>();


  ngOnInit(){
    this.authService.user.subscribe(userData => {
      this.user = userData;
      let langCode = userData.nativeLanguageId.toString()
      if (!langCode) {
        langCode = '1'
      }
      this.language = i18n[langCode]
    })
  }



  onCreateCollection() {

    if (this.collectionDescription.length){

      console.log(this.collectionDescription);
      this.isLoading = true;
      
      const URL =  `${NGROK}/collections`;
      const options = {
        name: this.collectionDescription,
        userId: this.user.id,
        public: true
      }
      
      return this.http.post(URL, options)
      .subscribe((response) =>{
        console.log('saved in database');
        this.isLoading = false;
        this.collectionDescription = '';
        let tab = 
        this.input.emit(response); 
      });
    }
  }
}
