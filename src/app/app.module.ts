import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CalculateComponent} from './calculate/calculate.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./auth.guard";

const appRoutes: Routes = [
  {path: '', component: AppComponent},
  {path: 'calculate', component: CalculateComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    CalculateComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
