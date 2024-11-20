import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {AnzeigeComponent} from "./anzeige/anzeige.component";

export const MyRoutes: Routes = [
    {path: 'anzeige', component: AnzeigeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(MyRoutes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }