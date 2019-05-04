import { Component, Input } from "@angular/core"
import { RouterExtensions } from 'nativescript-angular/router';
import { ItemEventData } from 'tns-core-modules/ui/list-view'

@Component({
  selector: 'ns-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['/collections.component.css'],
  moduleId: module.id
})
export class CollectionsComponent { //Collections from us
  title = 'Collections'

constructor(private router: RouterExtensions) { }


@Input() collections: string[] = [];

onItemTap(args: ItemEventData){
  console.log(args)
  this.router.navigate(['/collection'])
}
 
} 
