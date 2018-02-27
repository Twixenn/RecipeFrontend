import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {

  user = {};
  userLoggedIn = false;

  constructor(private auth: AuthenticationService, private router: Router) {
    this.user = this.auth.getUser();
    if (this.user['id'] !== undefined && this.user['id'] !== null && this.user['id'] !== 'undefined') {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
  }

  ngOnInit() {
  }

}
