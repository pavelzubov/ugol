import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {

  }

  ngOnInit() {

  }

  logIn() {
    this.authService.logIn('test', 'test');
    this.router.navigate(['/calculate']);
  }

}
