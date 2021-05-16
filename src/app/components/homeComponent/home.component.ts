import { Component, OnInit , OnDestroy  } from '@angular/core';
// import { User } from '../../_models';
// import { Subscription } from 'rxjs';
// // import { first } from 'rxjs/operators';
// import { AuthenticationService, UserService } from '../../_services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  // currentUser: User;
  // currentUserSubscription: Subscription;
  // // users: User[] = [];


  constructor( ) {
     


    }



// deleteUser(id: number) {
//   this.userService.delete(id).pipe(first()).subscribe(() => {
//       this.loadAllUsers( );
//   });
// }
// private loadAllUsers() {
//   this.userService.getAll().pipe(first()).subscribe(users => {
//       this.users = users;
//   });
// }
}
