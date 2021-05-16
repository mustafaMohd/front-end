import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiUrl: String = 'http://localhost:3000/v1';
  constructor(private alertService: AlertService, private http: HttpClient) { }
  create( film:string,comment: string) {
          
    return this.http.post<any>(`${this.apiUrl}/comments`,{ film,comment});
  }
}
