import { AfterContentInit, Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";
import { HttpClient } from "@angular/common/http";
import { NGROK } from '../../../config'
import { TNSPlayer, TNSRecorder } from 'nativescript-audio';
import { knownFolders, Folder, File } from "tns-core-modules/file-system";



@Component({
  selector: "ns-practice",
  moduleId: module.id,
  templateUrl: "./practice.component.html",
})
export class PracticeComponent implements OnInit {
  public cards: any;


  constructor(private http: HttpClient) {
  
  }


  ngOnInit(): void {
    
    this.http.get(`${NGROK}/collectionItems/8`)
    .subscribe( items => {
      console.log(items, 'http getting practice collection')
      this.cards = items;
      console.log('items coming into practice component', this.cards);
    })

  }


  onRecord(){

  }

}
