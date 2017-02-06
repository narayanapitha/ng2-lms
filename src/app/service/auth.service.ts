import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private http: Http, private router:Router) {}

  login(credentials) {
    this.http.post(
        'http://192.168.0.106/laravel-api-boilerplate-jwt-master/public/api/auth/login', credentials )
      .map(res => res.json())
      .subscribe(
        // We're assuming the response will be an object
        // with the JWT on an id_token key
        data => {
            localStorage.setItem('id_token', data.token);
            this.router.navigateByUrl('/');
        },
        error => {
          console.log(error);
          localStorage.setItem('id_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ');
          this.router.navigateByUrl('/');
        }
      );
  }
  loggedIn() {
    return tokenNotExpired();
  }
  logout() {
    localStorage.removeItem('id_token');
    this.router.navigateByUrl('/login');
  }
}