import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { PageRoute } from 'nativescript-angular/router';
import { ModalDialogService, ModalDialogParams } from 'nativescript-angular/modal-dialog'
import { SelectWordComponent } from '../select-word/select-word.component'
import { UIService } from '~/app/shared/ui.serivce';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'tns-core-modules/ui/page/page';
var camera = require("nativescript-camera"); //import * as camera from "nativescript-camera";
let Platform = require("tns-core-modules/platform");
// import Platform from "tns-core-modules/platform"// * as
let enumsModule = require('tns-core-modules/ui/enums');
// import enumsModule = require('tns-core-modules/ui/enums')
let { fromAsset } = require("tns-core-modules/image-source/image-source");
// import { fromAsset } from "tns-core-modules/image-source/image-source";



@Component({
  selector: 'ns-individual-collection',
  templateUrl: './individual-collection.component.html',
  styleUrls: ['./individual-collection.component.css'],
  moduleId: module.id,
})
export class IndividualCollectionComponent implements OnInit {

  public hello: string;

  constructor(private activatedRoute: ActivatedRoute, 
              private modalDialog: ModalDialogService,
              private vcRef: ViewContainerRef,
              private uiService: UIService,
              private http: HttpClient,
              //private modalParams: ModalDialogParams,
              private pageRoute: PageRoute) {
                this.activatedRoute.queryParams.subscribe( params => {
                  this.hello = params["hello"];
                });
              }

  ngOnInit() {

    console.log(this.hello);



    this.pageRoute.activatedRoute.subscribe(ActivatedRoute => {
      ActivatedRoute.paramMap.subscribe(paramMap => {
        console.log(paramMap.get('mode'))
      })
    });
  }

  onSelectObjectWord(){
    this.modalDialog.showModal(SelectWordComponent, 
      {fullscreen: true, 
       viewContainerRef: this.vcRef, //this.uiService.getRootVCRef() ? this.uiService.getRootVCRef : this.vcRef;
       context: {
         word1: 'dog',
         word2: 'quinn',
         word3: 'quinn-dog',
         word4: 'quinnier dog',
         word5: 'dog-quinn'
       } 
      });
  }


  uploadPhoto() {
    let http = this.http;
    let self = this;
    camera.requestPermissions().then(
      function success() {
        console.log('yes')
        let options = { width: 100, height: 100, keepAspectRatio: false, saveToGallery: true };
        let imageModule = require("tns-core-modules/ui/image");
        const format = enumsModule.ImageFormat.jpeg
        camera.takePicture(options)
          .then(function (imageAsset) {
            var image = new imageModule.Image();
            image.src = imageAsset;
            console.log(imageAsset.options.width, imageAsset.options.height)
            fromAsset(imageAsset).then((result) => {
              let base64 = result.toBase64String("jpeg", 100);
              let testUrl = 'https://02f28968.ngrok.io/images';
              let options = {
                base64: base64,
                nativeLanguage: Platform.device.language
              }
              http.post(testUrl, options)
                .subscribe((data) => {
                 // console.log(data);
                  self.modalDialog.showModal(SelectWordComponent,
                    {
                      fullscreen: true,
                      viewContainerRef: self.vcRef, //this.uiService.getRootVCRef() ? this.uiService.getRootVCRef : this.vcRef;
                      context: data
                    })
                     .then((action) => { 
                        console.log(action);
                     })
                })
                
            })
          }).catch(function (err) {
            console.log("Error -> " + err.message);
          });
      },
      function failure() {
        console.log('no')
      }
    );
  }



}

//every image block we create can have a nsRouterLink=pathtoItem