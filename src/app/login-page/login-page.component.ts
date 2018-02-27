import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication.service';
import {Router} from '@angular/router';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {
  private outputText;

  constructor(private auth: AuthenticationService,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    const user = this.auth.getUser();
    if (user['id'] !== null) {
      this.router.navigate(['user/' + user['id']]);
    }
  }

  login() {
    this.auth.userLogin();
  }

  getOutputText() {
    return this.outputText;
  }

  onSignIn(user) {
    localStorage.setItem('userId', user['password']);
    this.recipeService.login()
      .subscribe(data => {
          localStorage.setItem('userId', data['userId']);
          localStorage.setItem('username', data['username']);
          localStorage.setItem('id', data['id'])
          this.router.navigate(['user/' + data['id']]);
          window.location.reload();
        },
                  error => {
        this.outputText = 'Wrong password or username';
        localStorage.removeItem('userId');
      });
  }

  createUser() {
    window.location.replace('http://fia.te4.nu/google/');
  }

}
