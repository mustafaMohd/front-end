import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService,  } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { MustMatch } from 'src/app/helpers';








export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }


@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    hide= false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        // tslint:disable-next-line:no-trailing-whitespace
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
            this.alertService.error('you are already a logged In', true);
                   
        }
    }
   
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
            
            email: ['',[Validators.required,Validators.email] ],
            
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
            verifyPassword:['',[Validators.required]]
        
        },{validator:MustMatch('password', 'verifyPassword')}
        );
    
    
    }
    
    get name() { return this.registerForm.get('name'); }
    get email() { return this.registerForm.get('email'); }
    get password() { return this.registerForm.get('password'); }
    get verifyPassword() { return this.registerForm.get('verifyPassword'); }


    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;

        console.log(this.registerForm.value)
       
        this.authenticationService.register(this.name.value, this.email.value, this.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.loading = false;
                    
                    this.alertService.success(`wellcome ! ${data.user.name}`, true);
                    setTimeout(()=>{
                        this.alertService.clear();            
                        
                      },3000);
                    this.router.navigate(['']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                    setTimeout(()=>{
                        this.alertService.clear();            
                        
                      },15000);
                });
    }
  

    





}
