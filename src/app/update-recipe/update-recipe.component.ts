import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {EditRecipiesService} from '../edit-recipies.service';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.less']
})
export class UpdateRecipeComponent implements OnInit {

  tags;
  recipeId;
  recipe;
  addedIngredients = [];
  addedCategories = [];
  categoriesList = [];
  private unit;

  constructor(
    private editRecipes: EditRecipiesService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.recipeService.getCategories()
      .subscribe(data => { this.tags = data; this.editRecipes.start(this.tags); });

    this.route.params.subscribe(params => {
      this.recipeId = params['id'];
    });

    this.recipeService.getRecipe(this.recipeId)
      .subscribe(data => { this.recipe = data;
      if (!this.auth.isUserLoggedIn(this.recipe['userId'])) {this.router.navigate(['user/login']); }
              this.addedIngredients = this.recipe.ingredients;
              console.log(data);
              for (let i = 0; i < this.recipe.categories.length; i++) {
                this.categoriesList.push(this.recipe.categories[i].category);
              }
              this.editRecipes.updateStart(this.addedIngredients, this.categoriesList);
      });
  }

  public checkIfExists(category) {
    if (this.categoriesList.indexOf(category) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  public addIngredient(ingredient, amount) {
    this.addedIngredients = this.editRecipes.addIngredient(ingredient, Number(amount));
  }

  public onChange(value) {
    this.editRecipes.onChange(value);
  }

  public onChecked(category) {
    const index = this.categoriesList.indexOf(category);
    if (index === -1) {
      this.categoriesList.push(category);
    } else {
      this.categoriesList.splice(index, 1);
    }
  }

  public addToCategories(list) {
    this.addedCategories = this.editRecipes.addToCategories(list);
  }

  public removeIngredient(index) {
    this.addedIngredients.splice(index, 1);
  }

  public updateRecipe(recipe) {
    this.addToCategories(this.categoriesList);
    recipe.id = Number(this.recipeId);
    recipe.ingredients = this.addedIngredients;
    recipe.categories = this.addedCategories;
    console.log(recipe);
    this.recipeService.updateRecipe(recipe)
      .subscribe(
        success => { window.location.reload(); },
        error => { console.log(error); });
  }

  public delete() {
    this.recipeService.deleteRecipe(this.recipeId)
      .subscribe(success => { window.location.reload(); });
  }

}
