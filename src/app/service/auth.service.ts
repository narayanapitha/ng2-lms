import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {

  constructor(private http: Http, private router:Router) {}

  login(credentials) {
   return this.http.post('http://localhost:9000/api/login', credentials).map(res => res.json());
  }
  loggedIn() {
    return tokenNotExpired();
  }
  logout() {
    localStorage.removeItem('id_token');
    this.router.navigateByUrl('/login');
  }
}