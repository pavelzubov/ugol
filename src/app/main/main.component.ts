import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit() {
    if (this.authService.getLocalToken()) {
      this.router.navigate(['/calculate']);
    } else {
      this.router.navigate(['/auth']);
    }
  }

}
