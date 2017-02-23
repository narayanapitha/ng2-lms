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
	
	getUser(userdata){
       return this.http.post('http://localhost:9000/api/getUser', userdata).map(res => res.json());
    }
	
	listusers(){
		// add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://localhost:9000/api/users', options).map(res => res.json());
    }
}