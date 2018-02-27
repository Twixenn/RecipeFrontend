import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {ActivatedRoute} from '@angular/router';
import {RecipeService} from '../recipe.service';

declare const gapi: any;

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.less']
})
export class UserPageComponent implements OnInit {
  user;
  userExists = false;
  userLoggedIn = false;
  userId;

  constructor(private auth: AuthenticationService,
              private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });

    this.userLoggedIn = this.auth.isUserLoggedIn(this.userId);

    const user =  this.recipeService.getUser(this.userId)
      .subscribe(
        data => {
          this.user = data;
          if (this.user.id > 0) {
            this.userExists = true;
          }
        });
  }


  public signOut() {
    this.auth.userLogOut();
    window.location.reload();
  }
}

