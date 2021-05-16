import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  apiUrl = 'http://localhost:3000/v1';
  constructor(private alertService: AlertService, private http: HttpClient) { }


  // tslint:disable-next-line: typedef
  getAllFilms(page, limit ) {
    const params = new HttpParams()
        .set('page', page)
        .set('limit', limit)
;
    return this.http.get<any>(`${this.apiUrl}/films`, { params })
        .pipe(map(data => {



            return data;
        }));
}
// tslint:disable-next-line: typedef
create( name: string, description: string, ticketPrice: number, releaseDate: string, rating: number,
        genre: string[], country: string, photo: string
  ) {

  return this.http.post<any>(`${this.apiUrl}/films`, { name, description, ticketPrice, releaseDate, rating, genre, country, photo });
}
// tslint:disable-next-line: typedef
update( filmId: string, name: string, description: string, ticketPrice: number, releaseDate: string, rating: number,
        genre: string[], country: string, photo: string
  ) {

  // tslint:disable-next-line: max-line-length
  return this.http.patch<any>(`${this.apiUrl}/films/${filmId}`, { name, description, ticketPrice, releaseDate, rating, genre, country, photo });
}
// tslint:disable-next-line: typedef
getFilmById( filmId: string) {
console.log(filmId);
return this.http.get<any>(`${this.apiUrl}/films/${filmId}`);
}
// tslint:disable-next-line: typedef
delete( filmId: string) {

  return this.http.delete<any>(`${this.apiUrl}/films/${filmId}`);
}
}
