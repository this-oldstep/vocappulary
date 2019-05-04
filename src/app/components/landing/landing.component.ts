import { Component, OnInit } from '@angular/core';
import { CollectionsComponent } from '../collections/collections.component'
import { CollectionInputComponent} from '../collection-input/collection-input.component'

@Component({
  selector: 'ns-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  moduleId: module.id,
})
export class LandingComponent {

  activeCollections: string[] = [];


  onCollectionInput(collectionDescription: string) {
    this.activeCollections.push(collectionDescription);
  }

}
