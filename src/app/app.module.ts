import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import {NativeScriptFormsModule} from 'nativescript-angular/forms'
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from './auth/auth.component';
import { Buddies } from './components/buddies/buddies.component';
// import { Collections } from "./components/collections/collections.component"
import { PracticaComponent } from './components/practica/practica.component'
import {CollectionsComponent} from './components/collections/collections.component';
import { CollectionInputComponent } from './components/collection-input/collection-input.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AppComponent,
        PracticaComponent,
        CollectionsComponent,
        CollectionInputComponent,
        AuthComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
