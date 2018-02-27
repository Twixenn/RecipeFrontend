import {Component, Input, OnInit} from '@angular/core';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-personal-recipes',
  templateUrl: './personal-recipes.component.html',
  styleUrls: ['./personal-recipes.component.less']
})
export class PersonalRecipesComponent implements OnInit {

  userLoggedIn: boolean;
  user;
  userId;
  recipes;

  constructor(private auth: AuthenticationService,
              private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.userId = params['id'];
    });

    this.recipeService.getUserRecipies(this.userId)
      .subscribe(data => { this.recipes = data; });

    this.userLoggedIn = this.auth.isUserLoggedIn(this.userId);
  }

}
