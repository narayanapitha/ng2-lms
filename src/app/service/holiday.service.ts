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
export class HolidayService {

    constructor(
        private http: Http) {
    }
	
    addHoliday(data){
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:9000/api/holidays', data, options).map(res => res.json());
    }

    listHolidays(params: DataTableParams) {
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://localhost:9000/api/holidays?' + paramsToQueryString(params), options).toPromise()
            .then((resp: Response) => ({
                items: resp.json().data,
                count: resp.json().total
            }));
    }

    /*listHolidays(){
		// add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://localhost:9000/api/holidays', options).map(res => res.json());
    }*/

    editHoliday(data){ 
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
       return this.http.post('http://localhost:9000/api/holidays/edit', data, options).map(res => res.json());
    }

    deleteHoliday(data){ 
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
       return this.http.get('http://localhost:9000/api/holidays/delete/'+data, options).map(res => res.json());
    }
	
	getHoliday(data){
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('id_token') });
        let options = new RequestOptions({ headers: headers });
       return this.http.get('http://localhost:9000/api/holidays/'+data, options).map(res => res.json());
    }
	
}