import { Component, OnInit } from '@angular/core';
import { CollectionsComponent } from '../collections/collections.component'
import { CollectionInputComponent} from '../collection-input/collection-input.component'
import { RouterExtensions } from 'nativescript-angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '~/app/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { NGROK } from '../../../config'



@Component({
  selector: 'ns-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  moduleId: module.id,
})
export class LandingComponent implements OnInit {


  // private userId: number = 9;


  constructor(private router: RouterExtensions,
              private http: HttpClient,
              private authService: AuthService,   
              ) {}

  activeCollections: any;

  ngOnInit(){

    this.getAllCollections();
   
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
