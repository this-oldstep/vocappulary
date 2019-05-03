import { Component } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import * as camera from "nativescript-camera";
import bgHttpModule = require('nativescript-background-http')
import { NgModule } from '@angular/core';

const imageSourceModule = require("tns-core-modules/image-source");
let imagePicker = require("nativescript-imagepicker")
let fs = require("file-system")

const fsModule = require("tns-core-modules/file-system");
import enumsModule = require('tns-core-modules/ui/enums')
import { fromAsset } from "tns-core-modules/image-source/image-source";


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
  public myImage=""

  getPicture(){
    console.log("getpicture")
   let context = imagePicker.create({
      mode: "single"
    });
    context
      .authorize()
      .then(function () {
        return context.present();
      })
      .then(function (selection) {
        selection.forEach(function (selected) {
          // console.log(selected)
          console.log(selected.u)
        });
        // list.items = selection;
      }).catch(function (e) {
        // process error
      });

  }






  uploadPhoto() {
    camera.requestPermissions().then(
      function success() {
        console.log('yes')
        let options = { width: 100, height: 100, keepAspectRatio: false, saveToGallery: true };
        let imageModule = require("tns-core-modules/ui/image");
        const format = enumsModule.ImageFormat.jpeg

        camera.takePicture(options)
          .then(function (imageAsset) {
            console.log("Result is an image asset instance");
            var image = new imageModule.Image();
            image.src = imageAsset;
            console.log(imageAsset.options.width, imageAsset.options.height)
            fromAsset(imageAsset).then((result)=>{
              let base64 = result.toBase64String("jpeg", 100);
              console.log(base64);
            })
          }).catch(function (err) {
            console.log("Error -> " + err.message);
          });
      },
      function failure() {
        console.log('no')
      }
    );



    // let body = {
    //   "url": "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.caribfocus.com%2Fwp-content%2Fuploads%2F2015%2F09%2Fapples2.jpg&f=1"
    // }
    // this.http.get('https://jsonplaceholder.typicode.com/todos/1')
    //   .subscribe(data=>{
    //     console.log(data)
    //     this.post = data;
    //   })

    console.log('uploadPhoto');
  }


 } 