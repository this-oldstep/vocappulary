import { Component, OnInit, Input } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { NavigationExtras } from "@angular/router";
import { ItemEventData } from 'tns-core-modules/ui/list-view'


@Component({
  selector: 'ns-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  moduleId: module.id,
})
export class ItemListComponent  {

  constructor(private router: RouterExtensions) { }

  @Input() activeItems:
  {
    itemId: number,
    url_image: string,
    currentTranslation: string,
    nativeTranslation: string
    }[] = []

  onItemTap($event) {

    console.log($event);

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "wordId": $event.itemId,
        "url_image": $event.url_image,
        "currentTranslation": $event.currentTranslation,
        "nativeTranslation": $event.nativeTranslation,
      }
    }

    this.router.navigate(['/item'], navigationExtras)

  }

}
