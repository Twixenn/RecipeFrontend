import { Injectable } from '@angular/core';

@Injectable()
export class EditRecipiesService {
  private tags;
  private addedIngredients = [];
  private addedCategories = [];
  private categoriesList = [];
  private unit;

  constructor() { }

  public start(tags) {
    this.tags = tags;
  }

  public updateStart(ingredients, categories) {
    for(let i = 0; i < ingredients.length; i++) {
      ingredients[i]['amount'] = ingredients[i]['amount'].toString();
    }
    this.addedIngredients = ingredients;
    this.categoriesList = categories;
  }


  public addIngredient(ingredient, amount) {
    if (this.unit === undefined) {
      this.unit = this.tags.units[0].name;
    }
    if (ingredient && amount) {
      this.addedIngredients.push({'name': ingredient.toLowerCase(), 'amount': amount.toString(), 'unit': this.unit});
      this.unit = undefined;
    }
    return this.addedIngredients;
  }

  public onChange(value) {
    this.unit = value;
  }

  public onChecked(category) {
    const index = this.categoriesList.indexOf(category);
    if (index === -1) {
      this.categoriesList.push(category);
    } else {
      this.categoriesList.splice(index, 1);
    }
    return this.categoriesList;
  }

  public addToCategories(list) {
    for (let i = 0; i < list.length; i++) {
        this.addedCategories.push({'category': list[i]});
    }
    return this.addedCategories;
  }

}
