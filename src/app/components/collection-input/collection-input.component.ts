
import { Component,  EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '~/app/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { NGROK } from '../../../config';
// import { LandingComponent } from '../landing/landing.component';
const i18n = require('../../i18n/i18n.js');

@Injectable()
@Component({
  selector: 'ns-collection-input',
  templateUrl: './collection-input.component.html',
  styleUrls: ['./collection-input.component.css'],
  moduleId: module.id,
})
export class CollectionInputComponent implements OnInit  {

  collectionDescription = "";
  currentCollection = '';
  isLoading = false;

  // private userId: number = 9;
  constructor(private http: HttpClient,
    private authService: AuthService, 
    // private landing: LandingComponent
    ) { }

    private language: any; 



  @Output() input = new EventEmitter <Object>();


  ngOnInit(){
    this.authService.user.subscribe(userData => {
      let langCode = userData.nativeLanguageId.toString()
      if (!langCode) {
        langCode = '1'
      }
      this.language = i18n[langCode]
    })
  }

  onCreateCollection() {
    console.log(this.collectionDescription);
    this.authService.user.pipe(switchMap(currentUser => {
      const URL =  `${NGROK}/collections`;
    //should also include active status and userId
    const options = {
      name: this.collectionDescription,
      userId: currentUser.id,
      public: true
    }
    return this.http.post(URL, options)
      })).subscribe((response) =>{
      console.log('saved in database');
      
      this.input.emit(response);
      /*
        this response gives me the id of the collection created,
        figure out how to attach that id to the button created
        so that when that button is clicked, on ngOninit for 
        individualCollection, I can use that collection id to get 
        all the items from a collection. also its name
      */
    })
  }

}
