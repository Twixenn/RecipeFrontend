import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.less']
})
export class StartPageComponent implements OnInit {

  recipes;
  reviews;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.getRecipes()
      .subscribe(data => { this.recipes = data; });
  }

  public getStars(reviewValue: number) {
    const review = new Array();
    for (let i = 0; i < 5; i++) {
      if (i < reviewValue || i === reviewValue) {
        review.push('star-full.svg');
      } else if (i > reviewValue - 0.5) {
        review.push('star-half.svg');
      } else {
        review.push('star-full-white.svg');
      }
    }
    this.reviews.push(review);
  }

}
