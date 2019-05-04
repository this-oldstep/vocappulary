import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import {NativeScriptFormsModule} from 'nativescript-angular/forms'
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from './auth/auth.component';
import {CollectionsComponent} from './components/collections/collections.component';
import { CollectionInputComponent } from './components/collection-input/collection-input.component';
import {HttpClientModule } from '@angular/common/http'
import { NativeScriptCommonModule } from "nativescript-angular/common";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        HttpClientModule,
        NativeScriptCommonModule
    ],
    declarations: [
        AppComponent,
        CollectionsComponent,
        CollectionInputComponent,
        AuthComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
