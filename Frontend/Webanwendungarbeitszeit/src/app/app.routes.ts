import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AnzeigeComponent } from "./anzeige/anzeige.component";
import { EingabeComponent } from './eingabe/eingabe.component';

export const MyRoutes: Routes = [
    {path: 'anzeige', component: AnzeigeComponent},
    {path: 'eingabe', component: EingabeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(MyRoutes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }