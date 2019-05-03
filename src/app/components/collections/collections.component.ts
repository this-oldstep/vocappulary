import { Component } from "@angular/core"
//import {HttpClient} from "@angular/common/http"

@Component({
  selector: 'ns-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['/collections.component.css'],
  moduleId: module.id
})
export class CollectionsComponent { 
  title = 'Collections'

  collectionDescription= "";
  currentCollection = '';

  collections: string [] = [
    'living room',
    'skatepark',
    'yo mommas house',
    'restaurant'
  ]
  
  onCreateCollection(){
        this.currentCollection = this.collectionDescription;
    }

 
} 