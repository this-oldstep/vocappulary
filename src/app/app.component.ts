import { Component } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {
    enteredCollection="";

    onCollectionInput(collectionDescription: string) {
        this.enteredCollection = collectionDescription;
    }

 }
