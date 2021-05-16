import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location} from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { Film } from 'src/app/interfaces/film';
import { AlertService } from 'src/app/services/alert.service';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-view-film',
  templateUrl: './view-film.component.html',
  styleUrls: ['./view-film.component.css']
})
export class ViewFilmComponent implements OnInit {
  public loading = false;
  public film: Film;
  public filmId: string;
  public filmRating: number;

  constructor(private filmService: FilmService, private alertService: AlertService, private activatedRoute: ActivatedRoute, private location: Location) { }


  ngOnInit(): void {
    this.loading = true;

    this.activatedRoute.params.forEach((params: Params) => {
      this.filmId = params.id;
       // get the id from url
      console.log(this.filmId);
      this.filmService.getFilmById(this.filmId).subscribe((response) => {
      console.log(response);

      this.film = response;
      this.location.replaceState(`films/${this.film.slug}`);
      this.filmRating = response.rating;
      this.loading = false;
    }, (error) =>
      this.alertService.error(error)
       );
    });
    // this.location.replaceState(`/${this.film.slug}`);
  }
  back(): void {
    this.location.back();
  }
}
