import { Component, OnInit } from '@angular/core';
import { CollectionsComponent } from '../collections/collections.component'
import { CollectionInputComponent} from '../collection-input/collection-input.component'
import { RouterExtensions } from 'nativescript-angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'ns-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  moduleId: module.id,
})
export class LandingComponent implements OnInit {


  private userId: number = 9;


  constructor(private router: RouterExtensions,
              private http: HttpClient,      
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
    const URL = "https://449e90f7.ngrok.io/collections/get"

    const options = { userId: this.userId }

    this.http.post(URL, options)
      .subscribe(collections => {
        //console.log(collections);
        this.activeCollections = collections;
        console.log(this.activeCollections);
      })
  }




}
