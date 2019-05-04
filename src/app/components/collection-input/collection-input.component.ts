
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
   // this.currentCollection = this.collectionDescription;
   this.input.emit(this.collectionDescription);
   //this.http.post()

  }

}
