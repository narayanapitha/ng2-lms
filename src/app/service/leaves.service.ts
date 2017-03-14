import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class LeavesService {

    constructor(
        private http: Http) {
    }

    addLeave(data){
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:9000/api/leaves', data, options).map(res => res.json());
    }

    listLeaves(){
		// add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://localhost:9000/api/leaves', options).map(res => res.json());
    }

    listLeavesByUser(user){
		// add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
        if(user.role==1){
            return this.http.get('http://localhost:9000/api/leaves', options).map(res => res.json());
        }else{
            return this.http.get('http://localhost:9000/api/leavesuser/'+user._id, options).map(res => res.json());
        }
    }

    listLeavesByManager(user){
		// add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://localhost:9000/api/leavesmanager/'+user._id, options).map(res => res.json()); 
    }

    editLeave(data){ 
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
       return this.http.post('http://localhost:9000/api/leaves/edit', data, options).map(res => res.json());
    }

    deleteLeave(data){ 
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
       return this.http.get('http://localhost:9000/api/leaves/delete/'+data, options).map(res => res.json());
    }
	
	getLeaves(data){
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
       return this.http.get('http://localhost:9000/api/leaves/'+data, options).map(res => res.json());
    }

    confirmLeave(data){ 
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
       return this.http.post('http://localhost:9000/api/leaves/confirm', data, options).map(res => res.json());
    }
	
}