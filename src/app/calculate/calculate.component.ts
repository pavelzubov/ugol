import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Result, Response} from '../types.factory';
import {BaseService} from '../base.service';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.sass']
})
export class CalculateComponent implements OnInit {
  result: Result[];
  data: Response;
  count: number;
  public calculateForm: FormGroup = new FormGroup({
    'count': new FormControl('', Validators.required)
  });

  constructor(public authService: AuthService, public router: Router, public base: BaseService) {
  }

  ngOnInit() {
    this.base.getData().subscribe(res => {
      this.data = res;
      console.log(this.data);
    });
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
