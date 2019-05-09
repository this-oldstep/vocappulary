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
  public language: any;


  constructor(private router: RouterExtensions,
              private http: HttpClient,
              private authService: AuthService,   
              ) {}

  activeCollections: any;

  ngOnInit(){
    this.getAllCollections();
    this.authService.user.subscribe(userData=>{
      let langCode = userData.nativeLanguageId.toString()
      if (!langCode){
        langCode = '1'
      }
      this.language = i18n[langCode]
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
