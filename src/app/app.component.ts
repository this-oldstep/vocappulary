import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef, ViewContainerRef } from "@angular/core";
import { UIService } from "./shared/ui.serivce";
import { HttpClient } from '@angular/common/http';
import { Subscription } from "rxjs";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { LangModalComponent } from "./components/lang-modal/lang-modal.component";
import { NGROK } from '../config';
import { AuthService } from "./auth/auth.service";
import { take, switchMap } from 'rxjs/operators';
import { RouterExtensions } from "nativescript-angular/router";
import { User } from "./auth/user.model";
const i18n = require('./i18n/i18n.js')

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    user;
    @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent
    private drawerSub: Subscription
    private drawer: RadSideDrawer;
    constructor(
        private uiService: UIService, 
        private changeDetectionRef: ChangeDetectorRef,
        private vcRef: ViewContainerRef,
        private modalDialog: ModalDialogService,
        private http: HttpClient,
        private authService: AuthService,
        private router: RouterExtensions,
        // public user: User
        ) {}

        private language: any = {
            practice: "Practice",
            logout: "Logout",
            collections: "Collections",
            switchLanguage: 'Switch Language'
        } 

    ngOnInit() {
        this.drawerSub = this.uiService.drawerState.subscribe( () => {
            if (this.drawer) {
                this.authService.user.subscribe(userData => {
                    console.log("hello" + userData.nativeLanguageId)
                    let langCode = userData.nativeLanguageId.toString()
                    if (!langCode) {
                        langCode = '1'
                    }
                    console.log(i18n[langCode])
                    this.language = i18n[langCode]
                })
                this.drawer.toggleDrawerState();
            }
        });
        this.uiService.setRootVCRef(this.vcRef);

    }
    activeCollections: string[] = [];

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();


    }

    onCollectionInput(collectionDescription: string) {
        this.activeCollections.push(collectionDescription);
    }

    onLogout() {
        this.uiService.toggleDrawer();
    }

    ngOnDestroy() {
        if (this.drawerSub) {
            this.drawerSub.unsubscribe();
        }
    }
    langSelect() {
        this.modalDialog.showModal(LangModalComponent, {
            fullscreen: true, 
            viewContainerRef: this.uiService.getRootVCRef() 
            ? this.uiService.getRootVCRef()
            : this.vcRef
          })
          .then((action: Array<any>) => {
              return new Promise((resolve)=> {
                this.authService.user.pipe(take(1)).subscribe(currentUser => {
                    console.log(currentUser);
                    this.user = new User(currentUser.email, currentUser.id, currentUser.username, action[1], currentUser.nativeLanguageId, currentUser.points, currentUser._token, currentUser._tokenExpirationDate)
                      
                    this.http.patch(
                        `${NGROK}/user/edit/`
                        , {id: currentUser.id, currentLanguageId: action[1]}
                    ).subscribe(resData => {resolve(resData)})
                  })
              })
    }).then(resData => {
        this.uiService.toggleDrawer();
        this.authService.updateUser(this.user)
        }).catch(err => {
            console.log(err);
        })
    }
}
