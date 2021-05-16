import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Film } from 'src/app/interfaces/film';
import { AlertService } from 'src/app/services/alert.service';
import { FilmService } from 'src/app/services/film.service';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  public films: Film[];

  public totalFilms: number;
  public currentPage = 1;
  public pageSize = 1;
  public loading = false;
  constructor(private filmService: FilmService, private alertService: AlertService,
              private router: Router,
              private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.loadFilms(
      this.currentPage,
      this.pageSize,

      // this._currentSearchValue
    );

    this.primengConfig.ripple = true;
  }
  // tslint:disable-next-line: typedef
  private loadFilms(page: number, pageSize: number) {
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

  // tslint:disable-next-line: typedef
  public goToPage(pageEvent: PageEvent){

    this.currentPage = pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;


    this.loadFilms(
      this.currentPage,
      this.pageSize,
    );
  }
    // tslint:disable-next-line: typedef


}
