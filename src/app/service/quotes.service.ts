import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class QuoteService {

    constructor(
        private http: Http) {
    }

    getQuote(){
        return this.http.get('http://quotes.stormconsultancy.co.uk/random.json')
            .map((response: Response) => response.json());
    }
}