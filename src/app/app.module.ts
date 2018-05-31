import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CalculateComponent} from './calculate/calculate.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {AuthComponent} from './auth/auth.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatError,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainComponent} from './main/main.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';

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
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSortModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [AuthGuard, HttpClient ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
