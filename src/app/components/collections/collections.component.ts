import { Component, Input } from "@angular/core"
import { RouterExtensions } from 'nativescript-angular/router';
import { ItemEventData } from 'tns-core-modules/ui/list-view'
import { NavigationExtras } from "@angular/router";

@Component({
  selector: 'ns-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['/collections.component.css'],
  moduleId: module.id
})
export class CollectionsComponent { //Collections from us
  title = 'Collections'

constructor(private router: RouterExtensions) { }


@Input() collections:
  { id: number,
    name: any,
    public: boolean, 
    count: number, 
    createdAt: string, 
    updatedAt: string, 
    userId: number}[] = []


onItemTap($event){
  //console.log($event)

  let navigationExtras: NavigationExtras = {
    queryParams: {
      "id": $event.id,
      "name": $event.name,
      "public": $event.public,
      "count": $event.count,
      "createdAt": $event.createdAt,
      "updatedAt": $event.updatedAt,
      "userId": $event.userId
    }
  }

  this.router.navigate(['/collection'], navigationExtras)
}
 
} 
