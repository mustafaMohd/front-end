import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/sharedModule.module';
import { AuthService } from '../services/auth.service';


@NgModule({
  declarations: [ LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    
  ],
  providers: [
    AuthService,
    
  ]
})
export class AuthModule { }
