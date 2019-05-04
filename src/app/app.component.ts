import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef, ViewContainerRef } from "@angular/core";
import { UIService } from "./shared/ui.serivce";
import { Subscription } from "rxjs";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent
    private drawerSub: Subscription
    private drawer: RadSideDrawer;
    constructor(
        private uiService: UIService, 
        private changeDetectionRef: ChangeDetectorRef,
        private vcRef: ViewContainerRef
        ) {}

    ngOnInit() {
        this.drawerSub = this.uiService.drawerState.subscribe( () => {
            if (this.drawer) {
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
 }
