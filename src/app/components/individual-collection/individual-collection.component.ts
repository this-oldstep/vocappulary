import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { PageRoute } from 'nativescript-angular/router';
import { ModalDialogService, ModalDialogParams } from 'nativescript-angular/modal-dialog'
import { SelectWordComponent } from '../select-word/select-word.component'
import { UIService } from '~/app/shared/ui.serivce';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'tns-core-modules/ui/page/page';
import { AuthService } from '~/app/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { RouterExtensions } from 'nativescript-angular/router';
import { NavigationExtras } from "@angular/router";


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

  //public collection: {id: string, name: string, public: boolean, count: string, createdAt: string, updatedAt: string, userId: string};
  public collection: any;

  constructor(private activatedRoute: ActivatedRoute, 
              private modalDialog: ModalDialogService,
              private vcRef: ViewContainerRef,
              private uiService: UIService,
              private http: HttpClient,
              private authService: AuthService,
              private router: RouterExtensions,
              private pageRoute: PageRoute) {
                this.activatedRoute.queryParams.subscribe( params => {
                  this.collection = params;
                });
              }

  activeItems: any;

  ngOnInit() {

    this.getAllItems();
    //console.log('here are the items', this.activeItems);

    this.pageRoute.activatedRoute.subscribe(ActivatedRoute => {
      ActivatedRoute.paramMap.subscribe(paramMap => {
        console.log(paramMap.get('mode'))
      })
    });
  }

  getAllItems(){
    this.authService.user.pipe(switchMap(currentUser => {
      return this.http.get(`https://449e90f7.ngrok.io/collectionItems/${currentUser.id}`)
    })).subscribe(items => {
      console.log(items, 'userid');
    })
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
              let testUrl = 'https://449e90f7.ngrok.io/images';
              let options = {
                base64: base64,
                nativeLanguage: 'es'
              }
              http.post(testUrl, options)
                .subscribe((data) => {
                 // console.log(data);
                 data['collectionId'] = self.collection.id
                  self.modalDialog.showModal(SelectWordComponent,
                    {
                      fullscreen: true,
                      viewContainerRef: self.vcRef, //this.uiService.getRootVCRef() ? this.uiService.getRootVCRef : this.vcRef;
                      context: data,
                    })
                     .then((action) => { 
                        
                       console.log(action);
                       let navigationExtras: NavigationExtras = {
                         queryParams: {
                           //"wordId": action.itemId,
                           "url_image": action.image_url,
                           "currentTranslation": action.currentLangText,
                           //"nativeTranslation": action.nativeTranslation,
                         }
                       }

                      self.router.navigate(['/item'], navigationExtras)
                      
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