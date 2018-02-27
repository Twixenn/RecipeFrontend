import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.less']
})
export class FavoritesComponent implements OnInit {

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

    this.recipeService.getFavoriteRecipes(this.userId)
      .subscribe(data => { this.recipes = data; });
  }

}
