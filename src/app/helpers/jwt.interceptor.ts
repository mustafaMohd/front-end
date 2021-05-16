import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()

// export class JwtInterceptor implements HttpInterceptor {
//     constructor(private authenticationService: AuthenticationService) { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         // add authorization header with jwt token if available
//         const currentUserToken = this.authenticationService.getToken;
//         if (currentUserToken) {
//             request = request.clone({
//                 setHeaders: {
//                     Authorization: `Bearer ${currentUserToken}`
//                 }
//             });
//         }

//         return next.handle(request);
//     }
// }





export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUserToken = this.authenticationService.getToken;
        // if (currentUserToken) {
        //     request = request.clone({
        //         setHeaders: {
        //             Authorization: `Bearer ${currentUserToken}`
        //         }
        //     });
        const clonedRequest = request.clone({
			headers: request
				.headers
				.set('Authorization', currentUserToken ? `Bearer ${ currentUserToken}` : '')
		});


        // }

        return next.handle(clonedRequest);
    }
}
