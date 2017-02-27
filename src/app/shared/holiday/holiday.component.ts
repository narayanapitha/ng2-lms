import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'lms-holiday',
    templateUrl: 'holiday.component.html'
})
export class HolidayComponent implements OnInit {

    error: string;
    loading: boolean = false;
    success: string;
	holidayData: any;
    updatePage: boolean = false;
    holidayid: string;

    constructor() { }

    ngOnInit() { }
}