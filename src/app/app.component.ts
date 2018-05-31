import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {

  }

  ngOnInit() {

  }
  logOut(){
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
