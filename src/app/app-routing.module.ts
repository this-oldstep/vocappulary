import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AuthComponent } from "./auth/auth.component";
import { Buddies } from "./components/buddies/buddies.component";

const routes: Routes = [
    { path: "", component: AuthComponent },
    { path: "landing", component: Buddies }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
