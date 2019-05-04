import { Component } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import * as camera from "nativescript-camera";
@Component({
  selector: 'collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['/collections-list.component.css'],
  moduleId: module.id
})
export class CollectionsList {
  title = 'hello world'

  post: any;
  constructor(private http: HttpClient) {

  }
  

 } 