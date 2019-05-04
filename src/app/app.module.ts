import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import {NativeScriptFormsModule} from 'nativescript-angular/forms'
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from './auth/auth.component';
import {CollectionsComponent} from './components/collections/collections.component';
import { CollectionInputComponent } from './components/collection-input/collection-input.component';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives'
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './components/landing/landing.component'


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule,
        NativeScriptCommonModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        CollectionsComponent,
        CollectionInputComponent,
        AuthComponent,
        LandingComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
