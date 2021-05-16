import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/sharedModule.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HomeComponent } from './components/homeComponent';
import { AlertComponent } from './components/alertComponent';
import { NavbarComponent } from './components/navbarComponent/navbar.component';
import { SpinnerComponent } from './shared/spinner.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor, JwtInterceptor } from './helpers';
import { FilmsModule } from './films/films.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent,
    NavbarComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FilmsModule,
    AuthModule,
    UsersModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
