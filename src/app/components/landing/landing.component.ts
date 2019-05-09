import { Component, OnInit } from '@angular/core';
import { CollectionsComponent } from '../collections/collections.component'
import { CollectionInputComponent} from '../collection-input/collection-input.component'
import { RouterExtensions } from 'nativescript-angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '~/app/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { NGROK } from '../../../config'
const i18n = require('../../i18n/i18n.js')



@Component({
  selector: 'ns-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  moduleId: module.id,
})
export class LandingComponent implements OnInit {


  private myCollections: string;
  private language: any;


  constructor(private router: RouterExtensions,
              private http: HttpClient,
              private authService: AuthService,   
              ) {}

  activeCollections: any;

  ngOnInit(){
    this.getAllCollections();
    this.authService.user.subscribe(userData=>{
      this.language = i18n[userData.nativeLanguageId.toString()];
      // console.log(userData)
      // this.language = i18n[this.nativeLang]
    })
   
  }

  onCollectionInput($event) {
    let newCollection = $event;
    console.log(newCollection);
    this.getAllCollections();
  }

  getAllCollections(){
    
    this.authService.user.pipe(switchMap(currentUser => {
      const URL = `${NGROK}/collections/get`
      const options = { userId: currentUser.id }
      return this.http.post(URL, options)
    })).subscribe(collections => {
      //console.log(collections);
      this.activeCollections = collections;
      console.log('users collections', this.activeCollections);
    })
    

    
 
  }




}
