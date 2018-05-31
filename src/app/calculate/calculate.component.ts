import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.sass']
})
export class CalculateComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit() {
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
