import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { HttpClientModule } from '@angular/common/http';
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { BuddiesComponent } from "../components/buddies/buddies.component";
import { Login } from "../components/login/login.component";
import { PhotoComponentComponent } from "../components/photo-component/photo-component.component"

    @NgModule({
    imports: [
        HttpClientModule,
        NativeScriptCommonModule,
        HomeRoutingModule
    ],
    declarations: [
        PhotoComponentComponent,
        HomeComponent,
        BuddiesComponent,
        Login
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
