import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class HolidayService {

    constructor(
        private http: Http) {
    }
	
	

    addHoliday(data){
       return this.http.post('http://localhost:9000/api/addHoliday', data).map(res => res.json());
    }

    editHoliday(data){ 
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
       return this.http.post('http://localhost:9000/api/editHoliday', data, options).map(res => res.json());
    }

    deleteHoliday(data){ 
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
       return this.http.post('http://localhost:9000/api/deleteHoliday', {'id':data}, options).map(res => res.json());
    }
	
	getHoliday(data){
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
       return this.http.post('http://localhost:9000/api/getHolidays', {'id':data}, options).map(res => res.json());
    }
	
	listHolidays(){
		// add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://localhost:9000/api/listHolidays', options).map(res => res.json());
    }
}