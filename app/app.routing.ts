import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";

const routes: Routes = [
    { path: "", redirectTo: "/(tab1:items//tab2:items//tab3:items)", pathMatch: "full" },
    { path: "items", component: ItemsComponent, outlet: 'tab1' },
    { path: "item/:id", component: ItemDetailComponent, outlet: 'tab1' },
    { path: "items", component: ItemsComponent, outlet: 'tab2' },
    { path: "item/:id", component: ItemDetailComponent, outlet: 'tab2' },
    { path: "items", component: ItemsComponent, outlet: 'tab3' },
    { path: "item/:id", component: ItemDetailComponent, outlet: 'tab3' },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
