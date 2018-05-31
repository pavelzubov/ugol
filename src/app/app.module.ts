import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CalculateComponent} from './calculate/calculate.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'calculate', component: CalculateComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    CalculateComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
