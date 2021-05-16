import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmsComponent } from './films.component';
import { ViewFilmComponent } from './view-film/view-film.component';

const routes: Routes = [
  // { path: '', component: FilmsComponent },
  { path: '', component: FilmListComponent },
  { path: 'film/:id', component: ViewFilmComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
