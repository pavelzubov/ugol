import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {NgModel} from '@angular/forms';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  public user: string;
  public password: string;
  public wrong = false;
  public authForm: FormGroup = new FormGroup({
    'user': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
  });

  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit() {
  }

  public logIn() {
    this.authService.logIn(this.user, this.password)
      .then(res => this.router.navigate([res]))
      .catch(res => {
        this.wrong = true;
        console.error(res);
      });
  }
}
