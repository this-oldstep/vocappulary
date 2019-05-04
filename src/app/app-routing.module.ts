import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AuthComponent } from "./auth/auth.component";
import { CollectionsComponent } from "./components/collections/collections.component";

const routes: Routes = [
    { path: "", component: AuthComponent },
    { path: "landing", component: CollectionsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
