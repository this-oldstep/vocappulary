import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import {NativeScriptFormsModule} from 'nativescript-angular/forms'
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
// import { Collections } from "./components/collections/collections.component"
import { PracticaComponent } from './components/practica/practica.component'
import {CollectionsComponent} from './components/collections/collections.component';

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
        // Collections// hello
        PracticaComponent,
        CollectionsComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
