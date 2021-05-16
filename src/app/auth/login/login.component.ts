import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    // error = '';
    hide = false;
    // tslint:disable-next-line: typedef
    get email() { return this.loginForm.get('email'); }
    // tslint:disable-next-line: typedef
    get password() { return this.loginForm.get('password'); }


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthService,
              private alertService: AlertService,
    ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
  });


  // reset login status
    this.authenticationService.logout();

  // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
  // tslint:disable-next-line: typedef
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    // console.log(this.email.value, this.password.value);
    this.authenticationService.login(this.email.value, this.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success(  ` Wellcome back ${data.user.name} `);
                this.router.navigate([this.returnUrl]);

                setTimeout(() => {
                    this.alertService.clear();

                  }, 3000);

            },
            error => {
                this.alertService.error(error);
                this.loading = false;
                setTimeout(() => {
                    this.alertService.clear();

                  }, 3000);
            });
}


}
