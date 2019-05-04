
import { Component,  EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
@Component({
  selector: 'ns-collection-input',
  templateUrl: './collection-input.component.html',
  styleUrls: ['./collection-input.component.css'],
  moduleId: module.id,
})
export class CollectionInputComponent  {

  collectionDescription = "";
  currentCollection = '';

  constructor(private http: HttpClient) { }

  @Output() input = new EventEmitter <string>();

  onCreateCollection() {
   this.input.emit(this.collectionDescription);
   console.log(this.collectionDescription);

   const URL = 'https://3011c9d0.ngrok.io/collections';
   //should also include active status and userId
   const options = {
     name: this.collectionDescription
   }

   this.http.post(URL, options)
    .subscribe((response) =>{
      console.log(response);
      /*
        this response gives me the id of the collection created,
        figure out how to attach that id to the button created
        so that when that button is clicked, on ngOninit for 
        individualCollection, I can use that collection id to get all the items from a collection
      */
    })
  }

}
