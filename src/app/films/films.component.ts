import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { Film } from '../interfaces/film';
import { FilmModel } from '../models/film';
import { AlertService } from '../services/alert.service';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
 public films: Film[];

  public totalFilms: number;
  // tslint:disable-next-line: variable-name
  public _currentPage = 1;
  // tslint:disable-next-line: variable-name
  public _pageSize = 1;
  public loading = false;
  selectedFilm: Film;
  selectedFilms: Film[];
  newFilm: boolean;
  displayNewDialog: boolean;
  displayEditDialog: boolean;

  displayCommentDialog: boolean;
  filmSubject: Subject<Film> = new Subject();
  cols = [
    { field: 'name', header: 'name' },
    // { field: 'description', header: 'description' },
     { field: 'ticketPrice', header: 'ticketPrice' },
    { field: 'rating', header: 'rating' },
    { field: 'country', header: 'country' },
    { field: 'releaseDate', header: 'releaseDate' },
    // { field: 'photo', header: 'photo' }
    ];

  constructor(private filmService: FilmService, private alertService: AlertService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this._loadFilms(
      this._currentPage,
      this._pageSize,

      // this._currentSearchValue
    );
    this.displayNewDialog = false;
    this.displayEditDialog = false;

    this.displayCommentDialog = true;
  }

  private _loadFilms(page: number, pageSize: number) {
    this.loading = true;

    this.filmService.getAllFilms(
      page, pageSize,
    ).subscribe((response) => {
    console.log(response);

    this.films = response.results;
    this.totalFilms = response.totalResults;
    this.loading = false;
  }, (error) =>
    this.alertService.error(error)
     );


    }

  public goToPage(pageEvent: PageEvent){

    this._currentPage = pageEvent.pageIndex + 1;
    this._pageSize = pageEvent.pageSize;


    this._loadFilms(
      this._currentPage,
      this._pageSize,
    );
  }
  // tslint:disable-next-line: typedef
  showDialogToAdd() {
    // this.newUser = true;
    // this.user = new User;
    this.displayNewDialog = true;
    this.displayEditDialog = false;

    this. displayCommentDialog = false;
}
showDialogToEdit(u) {
  // this.newUser = true;
  // this.user = new User;
this.filmSubject.next(u);
this.displayEditDialog = true;
this.displayNewDialog = false;

this.displayCommentDialog = false;
}
onDialogClose(event) {
  console.log(event);
  this.displayEditDialog = event;
  this.displayNewDialog = event;
  this.displayCommentDialog = event;

}
EditFilm(u) {

  this.selectedFilm = this.cloneFilm(u);

  this.displayEditDialog = true;
  this.displayNewDialog = false;

  this.displayCommentDialog = false;
  }

  DeleteFilm(u) {
    this.filmService.delete(u.id).subscribe((response) => {



    this.loading = false;
  }, (error) =>
    this.alertService.error(error)
     );


    }
    showDialogToComment(u) {

      this.filmSubject.next(u);
      this.displayCommentDialog = true;
      this.displayEditDialog = false;
      this.displayNewDialog = false;


    }
  cloneFilm(u: Film): Film {
    const film = new FilmModel ;
    for (const prop in u) {
      film[prop] = u[prop];
    }
    return film;
  }
}
