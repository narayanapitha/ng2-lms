import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AdduserService {

    constructor(
        private http: Http) {
    }

    addUser(userdata){
       return this.http.post('http://localhost:9000/api/signup', userdata).map(res => res.json());
    }
}