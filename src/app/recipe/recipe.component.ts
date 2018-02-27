import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {RecipeService} from '../recipe.service';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.less']
})
export class RecipeComponent implements OnInit {

  recipe;
  recipeId;
  user;
  userReview;
  stars = ['full-white', 'full-white', 'full-white', 'full-white', 'full-white'];
  portions = 0;

  constructor(
    private auth: AuthenticationService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recipeId = params['id'];
    });
    this.recipeService.getRecipe(this.recipeId)
      .subscribe(data => { this.recipe = data; this.portions = this.recipe.portions});
  }

  public mouseOverStar(i: number) {
    for (let j = 0; j < 5; j++) {
      if (j <= i) {
        this.stars[j] = 'full';
      } else {
        this.stars[i] = 'full-white';
      }
    }
  }

  public reviewClick(i: number) {
    this.userReview = i + 1;
  }

  public addReview(review) {
    this.user = this.auth.getUser();
    if (this.user !== undefined && this.user['id'] !== null) {
      const userReview =  this.recipeService.postReview(review, this.recipeId)
        .subscribe(
          userReview => { window.location.reload();},
          error => { console.log(error); });
    } else {
      this.router.navigate(['user/login']);
    }
  }

  public addFavoriteRecipe() {
    const recipe = {'recipeId': this.recipeId, 'userId': this.recipe.userId};
    this.user = this.auth.getUser();
    if (this.user !== undefined) {
      const userFavorite =  this.recipeService.postFavoriteRecipe(this.user.id, recipe)
        .subscribe(
          userFavorite => { window.location.reload(); },
          error => { console.log(error); });
    }
  }

  public onSlideChange(event) {
    this.portions = event.target.value;


  }

}
