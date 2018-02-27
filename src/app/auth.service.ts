import { Injectable } from '@angular/core';

declare const gapi: any;

@Injectable()
export class AuthService {
  constructor() { }

  /**
   * Calling Google login API and fetching account details.
   * @param callback Callback to function
   */
  public authenticateUser(callback) {
    let auth2: any;
    let result: any;
    let error: any;
    gapi.load('auth2', function () {
      auth2 = gapi.auth2.init({
        client_id: '151235678110-fe77nenrk2ak8hovc4k9o6etq0v6e6ph',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      //Login button reference
      let loginButton: any = document.getElementById('google-login-button');
      auth2.attachClickHandler(loginButton, {},
        function (userDetails) {

          let profile = userDetails.getBasicProfile();

          callback(true);
        }, function (error) {
          this.error = (JSON.stringify(error, undefined, 2));
        });
    });
  }

  /**
   * Logout user from Google
   * @param callback Callback to function
   */
  userLogout(callback) {
    //You will be redirected to this URL after logging out from Google.
    let homeUrl = "http://fia.te4.nu/recept/user/login";
    let logoutUrl = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=" + homeUrl;
    document.location.href = logoutUrl;
    callback();
  }
}
