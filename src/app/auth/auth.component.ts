import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Observable, pipe} from 'rxjs/index';
import {map} from 'rxjs/internal/operators';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
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
    this.authService.logIn(this.authForm.controls['user'].value, this.authForm.controls['password'].value)
      .subscribe(res => this.router.navigate([res]), err => {
        this.wrong = true;
        console.error(err);
      });
  }
}
