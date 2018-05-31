import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CalculateComponent} from './calculate/calculate.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { MainComponent } from './main/main.component';

const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'calculate', component: CalculateComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    CalculateComponent,
    AuthComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
