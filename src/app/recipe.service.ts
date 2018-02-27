import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {baseEjectCommandOptions} from '@angular/cli/commands/eject';

@Injectable()
export class RecipeService {
  private basicUrl: String = 'http://94.46.140.3:8080/fia-recipe-backend/api/';

  constructor(private http: HttpClient) { }

  public getRecipes() {
    return this.getData('recipes');
  }

  public getRecipe(id: string) {
    return this.getData('recipe/' + id);
  }

  public getUser(id: string) {
    return this.getData(id);
  }

  public login() {
    return this.getData('user/login');
  }

  public getUserReviews(id: string) {
    return this.getData(id + '/reviews');
  }

  public getUserRecipies(id: string) {
    return this.getData(id + '/recipes');
  }

  public getCategories() {
    return this.getData('tags');
  }

  public getFavoriteRecipes(id: string) {
    return this.getData('recipes/favorite/' + id);
  }

  public postReview(data, id) {
    return this.postData('recipe/' + id + '/review', data);
  }

  public postRecipe(data) {
    return this.postData('recipe', data);
  }

  public postFavoriteRecipe(userId, data) {
    return this.postData('recipe/' + userId + '/favorite', data);
  }

  public updateRecipe(data) {
    return this.updateData('recipe', data);
  }

  public deleteRecipe(id) {
    return this.deleteData('recipe/' + id);
  }

  public getData(url) {
    const getUrl = this.basicUrl + url;
    return this.http.get(getUrl);
  }

  public postData(url, data) {
    const postUrl = this.basicUrl + url;
    return this.http.post(postUrl, JSON.stringify(data));
  }

  public updateData(url, data) {
    const updateUrl = this.basicUrl + url;
    return this.http.put(updateUrl, JSON.stringify(data));
  }

  public deleteData(url) {
    const deleteUrl = this.basicUrl + url;
    return this.http.delete(deleteUrl);
  }
}
