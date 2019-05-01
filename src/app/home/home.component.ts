import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }


    onSignIn(){
        console.log('signedIn!');
    }


    ngOnInit(): void {
        // Init your component properties here.
    }
}
