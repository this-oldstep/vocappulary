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
import { NGROK } from '../../../config';
const i18n = require('../../i18n/i18n.js')


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
  isLoading = false;

  constructor(private activatedRoute: ActivatedRoute, 
              private modalDialog: ModalDialogService,
              private vcRef: ViewContainerRef,
              private uiService: UIService,
              private http: HttpClient,
              private authService: AuthService,
              private router: RouterExtensions,
              private pageRoute: PageRoute) {
                this.activatedRoute.queryParams.subscribe( params => {
                  
                  if (params && params.id){
                    this.collection = params;
                  } 
                  //console.log('coming into individual coll id is', this.collection.id)

                });
              }

  activeItems: any;
  private language: any;

  ngOnInit() {
    this.authService.user.subscribe(userData => {
      let langCode = userData.nativeLanguageId.toString()
      if (!langCode) {
        langCode = '1'
      }
      this.language = i18n[langCode]
    })
    this.getAllItems();
    //console.log('here are the items', this.activeItems);

    this.pageRoute.activatedRoute.subscribe(ActivatedRoute => {
      ActivatedRoute.paramMap.subscribe(paramMap => {
        console.log(paramMap.get('mode'))
      })
    });
  }

  getAllItems(){
    this.isLoading = true
    this.authService.user.pipe(switchMap(currentUser => {
      return this.http.get(`${NGROK}/collectionItems/${this.collection.id}`)
    })).subscribe(items => {
      this.activeItems = items;
      this.activeItems.reverse();
      this.isLoading = false;
      console.log(items, 'items in collection');
    })
  }


  


  uploadPhoto() {
    let http = this.http;
    let self = this;
    let collectionId = this.collection.id;
    camera.requestPermissions().then(
      () => {
        console.log('yes')
        let options = { width: 100, height: 100, keepAspectRatio: false, saveToGallery: true };
        let imageModule = require("tns-core-modules/ui/image");
        const format = enumsModule.ImageFormat.jpeg
        camera.takePicture(options)
          .then((imageAsset) => {
            var image = new imageModule.Image();
            image.src = imageAsset;
            console.log(imageAsset.options.width, imageAsset.options.height)
            fromAsset(imageAsset).then((result) => {
              this.authService.user.pipe(switchMap(currentUser => {
              let base64 = result.toBase64String("jpeg", 100);
              let testUrl = `${NGROK}/images`;
              let options = {
                base64: base64,
                userId: currentUser.id,
              }
              return http.post(testUrl, options)
              }))
                .subscribe((data) => {
                  data['collectionId'] = collectionId;
                  self.modalDialog.showModal(SelectWordComponent,
                    {
                      fullscreen: true,
                      viewContainerRef: self.vcRef, //this.uiService.getRootVCRef() ? this.uiService.getRootVCRef : this.vcRef;
                      context: data,
                    })
                     .then((action) => { 
                        
                       console.log(action);
                      //  let navigationExtras: NavigationExtras = {
                      //    queryParams: {
                      //      //"wordId": action.itemId,
                      //      "url_image": action.image_url,
                      //      "currentTranslation": action.currentLangText,
                      //      //"nativeTranslation": action.nativeTranslation,
                      //    }
                      //  }

      
                      //  self.router.navigate(['/item'], navigationExtras)
                       self.getAllItems();
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