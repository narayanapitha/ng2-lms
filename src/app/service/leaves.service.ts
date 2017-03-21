import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { DataTableParams } from 'angular-2-data-table';
import 'rxjs/add/operator/toPromise';

function paramsToQueryString(params: DataTableParams) {
    let result = [];

    if (params.offset != null) {
        result.push(['_start', params.offset]);
    }
    if (params.limit != null) {
        result.push(['_limit', params.limit]);
    }
    if (params.sortBy != null) {
        result.push(['_sort', params.sortBy]);
    }else{
         result.push(['_sort', 'lastname']);
    }
    if (params.sortAsc != null) {
        result.push(['_order', params.sortAsc ? '1' : '-1']);
    }else{
         result.push(['_order', '1']);
    }

    return result.map(param => param.join('=')).join('&');
}

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

    listLeavesByUser(user, params: DataTableParams){
		// add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
        if(user.role==1){
            //return this.http.get('http://localhost:9000/api/leaves', options).map(res => res.json());
            return this.http.get('http://localhost:9000/api/leaves?' + paramsToQueryString(params), options).toPromise()
            .then((resp: Response) => ({
                items: resp.json().data,
                count: resp.json().total
            }));

        }else{
            //return this.http.get('http://localhost:9000/api/leavesuser/'+user._id, options).map(res => res.json());
            return this.http.get('http://localhost:9000/api/leavesuser/'+user._id+'?' + paramsToQueryString(params), options).toPromise()
            .then((resp: Response) => ({
                items: resp.json().data,
                count: resp.json().total
            }));
        }
    }

    listLeavesByManager(user, params: DataTableParams){
		// add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
        //return this.http.get('http://localhost:9000/api/leavesmanager/'+user._id, options).map(res => res.json()); 
        return this.http.get('http://localhost:9000/api/leavesmanager/'+user._id+'?' + paramsToQueryString(params), options).toPromise()
        .then((resp: Response) => ({
            items: resp.json().data,
            count: resp.json().total
        }));

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