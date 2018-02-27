import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatListModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { StartPageComponent } from './start-page/start-page.component';
import { RecipeComponent } from './recipe/recipe.component';
import { UserPageComponent } from './user-page/user-page.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { PersonalRecipesComponent } from './personal-recipes/personal-recipes.component';

import { BackendInterceptor } from './backend.interceptor';

import { EditRecipiesService } from './edit-recipies.service';
import { RecipeService } from './recipe.service';
import { AuthenticationService } from './authentication.service';
import { AuthService } from './auth.service';

import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    StartPageComponent,
    RecipeComponent,
    UserPageComponent,
    FavoritesComponent,
    ReviewsComponent,
    PersonalRecipesComponent,
    LoginPageComponent,
    AddRecipeComponent,
    UpdateRecipeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot([
      {path: '', component: StartPageComponent},
      {path: 'home', component: StartPageComponent},
      {path: 'recipe/:id', component: RecipeComponent},
      {path: 'user/login', component: LoginPageComponent},
      {path: 'user/:id', component: UserPageComponent, children: [
          {path: '', component: FavoritesComponent},
          {path: 'favorites', component: FavoritesComponent},
          {path: 'reviews', component: ReviewsComponent},
          {path: 'personal-recipes', component: PersonalRecipesComponent},
          {path: 'add-recipe', component: AddRecipeComponent},
          {path: 'update-recipe/:id', component: UpdateRecipeComponent}
        ]}
    ])
  ],
  providers: [RecipeService, AuthenticationService, EditRecipiesService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: BackendInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
