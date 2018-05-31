import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  user: string;
  password: string;

  constructor(public authService: AuthService, public router: Router) {

  }

  ngOnInit() {

  }

  logIn() {
    this.authService.logIn(this.user, this.password)
      .then(res => this.router.navigate([res]))
      .catch(res => console.error(res));
  }

}
