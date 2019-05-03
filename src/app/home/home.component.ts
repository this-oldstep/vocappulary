import { Component, OnInit } from "@angular/core";
import * as Platform from "platform"

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }
    public deviceLang = Platform.device.language


    ngOnInit(): void {
        // Init your component properties here.
    }
}
