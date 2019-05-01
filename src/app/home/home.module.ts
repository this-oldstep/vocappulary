import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { Collections } from "../components/collections/collections.component";
import { CollectionsList } from "../components/collections-list/collections-list.component";
import { Buddies } from "../components/buddies/buddies.component";
import { Practice } from "../components/practice/practice.component";

    @NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule
    ],
    declarations: [
        HomeComponent,
        Collections,
        CollectionsList,
        Buddies,
        Practice

    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
