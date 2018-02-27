import {Component, OnInit} from '@angular/core';
import { RecipeService } from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {EditRecipiesService} from '../edit-recipies.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.less'],

})

export class AddRecipeComponent implements OnInit {

  userId;
  tags;
  addedIngredients = [];
  addedCategories = [];
  categoriesList = [];
  private unit;

  constructor(
    private editRecipes: EditRecipiesService,
    private recipeService: RecipeService,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.userId = params['id'];
    });

    this.recipeService.getCategories()
      .subscribe(data => { this.tags = data; this.editRecipes.start(this.tags); });

    if (!this.auth.isUserLoggedIn(this.userId)) {this.router.navigate(['user/login']); }
    console.log(this.addedCategories);
  }

  public addIngredient(ingredient, amount) {
    this.addedIngredients = this.editRecipes.addIngredient(ingredient, amount);
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

  public addRecipe(recipe) {
    this.addToCategories(this.categoriesList);
    recipe.ingredients = this.addedIngredients;
    recipe.categories = this.addedCategories;
    console.log(recipe);
    this.recipeService.postRecipe(recipe)
      .subscribe(
        success => { window.location.reload(); },
        error => { console.log(error); });
  }
}
