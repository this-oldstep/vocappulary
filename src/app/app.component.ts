import { Component } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {
    
    //enteredCollection="";
    activeCollections: string[] = [];


    onCollectionInput(collectionDescription: string) {
        this.activeCollections.push(collectionDescription);
    }

 }
