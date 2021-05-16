import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';
import { FilmsComponent } from './films.component';
import { SharedModule } from '../shared/sharedModule.module';
import { EditFilmComponent } from './edit-film/edit-film.component';
import { CreateFilmComponent } from './create-film/create-film.component';
import { CommentComponent } from './comment/comment.component';
import { FilmListComponent } from './film-list/film-list.component';
import { ViewFilmComponent } from './view-film/view-film.component';


@NgModule({
  declarations: [FilmsComponent, EditFilmComponent, CreateFilmComponent, CommentComponent, FilmListComponent, ViewFilmComponent],
  imports: [
    CommonModule,
    SharedModule,
    FilmsRoutingModule
  ]
})
export class FilmsModule { }
