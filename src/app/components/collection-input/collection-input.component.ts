import { Component,  EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ns-collection-input',
  templateUrl: './collection-input.component.html',
  styleUrls: ['./collection-input.component.css'],
  moduleId: module.id,
})
export class CollectionInputComponent  {

  collectionDescription = "";
  currentCollection = '';

  // collections: string[] = [
  //   'living room',
  //   'skatepark',
  //   'yo mommas house',
  //   'restaurant'
  // ]

  @Output() input = new EventEmitter <string>();

  onCreateCollection() {
   // this.currentCollection = this.collectionDescription;
   this.input.emit(this.collectionDescription);
  }

}
