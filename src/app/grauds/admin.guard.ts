import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';
//import { Role } from '../_models/Role';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
        const currentUser = this.authenticationService.currentUserValue;
        const isAdmin=currentUser && currentUser.role==='admin';
        
        if ( isAdmin) 
        {
            
            // logged in so return true
            return true;
        }
        // this.router.navigate(['/auth/profile'], { queryParams: { returnUrl: state.url } });
        // return false;
        

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    
    }
}
