import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HolidayService } from '../../../service/holiday.service';

@Component({
    selector: 'lms-newholiday',
    templateUrl: 'newholiday.component.html',
    providers: [HolidayService]
})
export class NewholidayComponent implements OnInit {
  
    error: string;
    loading: boolean = false;
    success: string;
	holidayData: any;
    updatePage: boolean = false;
    holidayid: string;

    constructor(private fb: FormBuilder, private router: Router, private holidayService: HolidayService, private activatedRoute: ActivatedRoute) {
    }
	
	ngOnInit() {
		let params: any = this.activatedRoute.snapshot.params;
        if(params.id){
            this.getHolidayData(params.id);
            this.holidayid = params.id;
        }
	}	
	
	getHolidayData(id){
		this.holidayService.getHoliday(id).subscribe(
            data => {
                if(data.success){
                    this.holidayData = data.data;
                    this.updatePage = true;
                    this.holidayForm = this.fb.group({
                        holidayname: [this.holidayData.holidayname, Validators.required],
                        holidaydate: [this.holidayData.holidaydate, Validators.required]
                    });
                    
                }else{
                    this.error = data.msg;
                }
                this.loading = false;
            },
            error => {
            this.error = error.msg;
            this.loading = false;
            }
        );
	}
	
	public holidayForm = this.fb.group({
        
        holidayname: ["", Validators.required],
        holidaydate: ["", Validators.required]
    });

    submitForm() {
        this.loading = true;
		this.error = "";
		this.success = "";

        if(this.holidayid){
            /*-----------edit user data code ----------*/
            this.holidayForm.value.id = this.holidayid;
            this.holidayService.editHoliday(this.holidayForm.value).subscribe(
                data => {
                    window.scrollTo(0, 0);
                    if(data.success){
                        this.success = data.msg;
                    }else{
                        this.error = data.msg;
                    }
                    this.loading = false;
                },
                error => {
                    window.scrollTo(0, 0);
                    this.error = error.msg;
                    this.loading = false;
                }
            );
        }else{
    
            /*-----------add user data code ----------*/
            this.holidayService.addHoliday(this.holidayForm.value).subscribe(
                data => {
                    window.scrollTo(0, 0);
                    if(data.success){
                        this.success = data.msg;
                    }else{
                        this.error = data.msg;
                    }
                    this.loading = false;
                },
                error => {
                    window.scrollTo(0, 0);
                    this.error = error.msg;
                    this.loading = false;
                }
            );
        }
    }
}