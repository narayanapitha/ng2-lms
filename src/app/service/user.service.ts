import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {

    constructor(
        private http: Http) {
    }

    getUser(){
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
        
        // get users from api
        return this.http.get('http://192.168.0.123/laravelinfyomtest/public/api/getuser', options)
            .map((response: Response) => response.json());
    }
}