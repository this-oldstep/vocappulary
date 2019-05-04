import { Component, Input } from "@angular/core"
//import {HttpClient} from "@angular/common/http"
import { ItemEventData } from 'tns-core-modules/ui/list-view'

@Component({
  selector: 'ns-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['/collections.component.css'],
  moduleId: module.id
})
export class CollectionsComponent { 
  title = 'Collections'

@Input() collections: string[] = [];

onItemTap(args: ItemEventData){
  console.log(args)
}
 
} 