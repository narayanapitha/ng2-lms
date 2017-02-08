import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../service/quotes.service';

@Component({
    selector: 'lms-dashboard',
    templateUrl: 'dashboard.component.html',
    providers: [QuoteService]
})
export class DashboardComponent implements OnInit {

    quote: any;

    constructor( private quoteService: QuoteService) { }

    ngOnInit() { 
        this.quoteService.getQuote()
            .subscribe(data => {
                this.quote = data;
            });
    }
}