import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from 'nativescript-angular/forms'
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from './auth/auth.component';
import {CollectionsComponent} from './components/collections/collections.component';
import { CollectionInputComponent } from './components/collection-input/collection-input.component';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives'
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './components/landing/landing.component';
import { ActionBarComponent } from './shared/ui/action-bar/action-bar.component'
import { ReactiveFormsModule } from "@angular/forms";
import { PhotoComponentComponent} from './components/photo-component/photo-component.component'
import { IndividualCollectionComponent} from './components/individual-collection/individual-collection.component';
import { SelectWordComponent } from './components/select-word/select-word.component'
import {ItemComponent } from './components/item/item.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { IndividualCollectionService } from "./components/individual-collection/individual-collection.service";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { PracticeComponent } from './components/practice/practice.component';


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule,
        ReactiveFormsModule,
        NativeScriptCommonModule,
        HttpClientModule,
        NativeScriptUIListViewModule
    ],
    providers: [IndividualCollectionService],
    declarations: [
        AppComponent,
        CollectionsComponent,
        CollectionInputComponent,
        AuthComponent,
        LandingComponent,
        ActionBarComponent,
        IndividualCollectionComponent,
        PhotoComponentComponent,
        SelectWordComponent,
        ItemComponent,
        ItemListComponent,
        PracticeComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [SelectWordComponent]
})
export class AppModule { }
