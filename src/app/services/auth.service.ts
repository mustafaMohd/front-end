import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

   apiUrl: String = 'http://localhost:3000/v1';

   private currentUserSubject: BehaviorSubject<User>;
   public currentUser: Observable<User>;



   
   constructor(private alertService: AlertService,private http: HttpClient) {
       
       // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      
       this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
       
       this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
       return this.currentUserSubject.value;
   }
   public get getToken(): string {
       return localStorage.getItem('currentUserToken');
     }


   
 register(name:string,email: string, password: string){
   
  return this.http.post<any>(`${this.apiUrl}/auth/register`, { name,email, password })
      .pipe(map(data => {

          console.log(data);
          // login successful if there's a jwt token in the response http://localhost:3000
          if (data.user && data.tokens) {
              localStorage.removeItem('currentUser');
              localStorage.removeItem('currentUserToken');
          
              localStorage.removeItem('timer');
              // store user details and jwt token in local storage to keep user logged in between page refreshes
             
              localStorage.setItem('currentUser', JSON.stringify(data.user));
              localStorage.setItem('currentUserToken', data.tokens.access.token);
              
              //const time_to_login = Date.now() + 604800000; 
              localStorage.setItem('timer', JSON.stringify(data.tokens.access.expires));
              this.currentUserSubject.next(data.user);

          }

          return data;
      }), catchError(this.handleError)
      
      );
}




 

  

   
   login(email: string, password: string) {
     console.log(email)
       return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password })
           .pipe(map(data => {
               // login successful if there's a jwt token in the response http://localhost:3000
               if (data.user && data.tokens) {
                   // store user details and jwt token in local storage to keep user logged in between page refreshes
                   localStorage.removeItem('currentUser');
                   localStorage.removeItem('currentUserToken');
               
                   localStorage.removeItem('timer');
                   
                   
                   localStorage.setItem('currentUser', JSON.stringify(data.user));
                   localStorage.setItem('currentUserToken', data.tokens.access.token);
                   
                   //const time_to_login = Date.now() + 604800000; 
                   localStorage.setItem('timer', JSON.stringify(data.tokens.access.expires));
                   this.currentUserSubject.next(data.user);
                
                   this.alertService.success(" Successfully login")
               }

               return data;
           }));
   }

 


   
   logout() {
       // remove user from local storage to log user out
       localStorage.removeItem('currentUser');
       localStorage.removeItem('currentUserToken');
      
       localStorage.removeItem('timer');
       this.currentUserSubject.next(null);
  
   }
   private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      this.alertService.error(`${error.error.message}`)
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    this.alertService.error(`Backend returned code ${error.status}, ` +
    `body was: ${error.error}`)
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


}
