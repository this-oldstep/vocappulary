import { Component, OnInit } from '@angular/core';
import { CollectionsComponent } from '../collections/collections.component'
import { CollectionInputComponent} from '../collection-input/collection-input.component'
import { RouterExtensions } from 'nativescript-angular/router';



@Component({
  selector: 'ns-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  moduleId: module.id,
})
export class LandingComponent {
  constructor(private router: RouterExtensions) {}
  activeCollections: string[] = [];


  onCollectionInput(collectionDescription: string) {
    this.activeCollections.push(collectionDescription);
  }


}
