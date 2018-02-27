import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  private url = 'hhttp://94.46.140.3:8080/fia-recipe-backend/api/login';
  private user = {};

  constructor(private http: HttpClient) {
    if (localStorage.getItem('id') !== undefined) {
      this.user['id'] = localStorage.getItem('id');
      this.user['username'] = localStorage.getItem('username');
    }
  }

  userLogin() {
    this.checkUser()
      .subscribe(
        data => {
        this.addUserInfo(data);
        },
        error => {
          this.newUser()
            .subscribe( data => {
              this.addUserInfo(data);
            });
        }
      );
  }

  addUserInfo(data) {
    this.user = data;
    localStorage.setItem('username', this.user['username']);
    localStorage.setItem('id', this.user['id']);
    localStorage.setItem('userId', this.user['userId']);
    window.location.reload();
  }

  newUser() {
    const url = 'http://94.46.140.3:8080/fia-recipe-backend/api/user';
    return this.http.get(url);
  }

  checkUser() {
    const url = 'http://94.46.140.3:8080/fia-recipe-backend/api/login';
    return this.http.get(url);
  }

  getUser() {
    this.user['id'] = localStorage.getItem('id');
    this.user['username'] = localStorage.getItem('username');
    return this.user;
  }

  isUserLoggedIn(id) {
    if (id !== undefined && id === this.user['id']) {
      return true;
    }
    return false;
  }

  userLogOut() {
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  }

}
