import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LeavesService } from '../../../service/leaves.service';
import { UserService } from '../../../service/user.service';
import {IMyOptions} from 'mydaterangepicker';


@Component({
    selector: 'lms-applyleave',
    templateUrl: 'applyleave.component.html',
    providers: [LeavesService, UserService]
})
export class ApplyleaveComponent implements OnInit {
    private myDateRangePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd-mm-yyyy',
        editableDateRangeField : false
    };
    error: string;
    loading: boolean = false;
    success: string;
	leaveData: any;
    updatePage: boolean = false;
    leaveid: string;
    loginuser: any;

    constructor(private fb: FormBuilder, private router: Router, private leavesService: LeavesService, private userService: UserService, private activatedRoute: ActivatedRoute) {
         // get users from secure api end point
        this.userService.getUser()
            .subscribe(users => { this.loginuser = users.data });
     }

     ngOnInit() { 
        let params: any = this.activatedRoute.snapshot.params;
        if(params.id){

            this.userService.getUser()
            .subscribe(users => { 
                this.loginuser = users.data,
                this.getLeaveData(params.id);
                this.leaveid = params.id;
             });
            
            //this.getLeaveData(params.id);
            //this.leaveid = params.id;
        }
    }

    getLeaveData(id){
		this.leavesService.getLeaves(id).subscribe(
            data => {
                if(data.success){
                    this.leaveData = data.data;
                    this.updatePage = true;
                    this.leaveForm = this.fb.group({
                        leavetype: [this.leaveData.leavetype, Validators.required],
                        leavedate: [this.leaveData.leavedate, Validators.required],
                        /*enddate: [this.leaveData.enddate, Validators.required],*/
                        description: [this.leaveData.description, Validators.required],
                        approve_status: [this.leaveData.approve_status],
                        comment: [this.leaveData.comment]
                    });

                }else{
                    this.error = data.msg;
                }
                this.loading = false;
            },
            error => {
            this.error = error.msg;
            this.loading = false;
            });
	}
	
	public leaveForm = this.fb.group({
        
        leavetype: ["", Validators.required],
        leavedate: ["", Validators.required],
        /*enddate: ["", Validators.required],*/
        description: ["", Validators.required],
        approve_status: [""],
        comment: [""]
    });

    submitForm() {
        this.loading = true;
		this.error = "";
		this.success = "";

        if(this.leaveid){
            
            /*-----------edit user data code ----------*/
            this.leaveForm.value.id = this.leaveid;
            this.leaveForm.value.managerid = this.loginuser.reportingmanager;
            this.leavesService.editLeave(this.leaveForm.value).subscribe(
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
            this.leaveForm.value.approve_status = '0';
            this.leaveForm.value.userid = this.loginuser._id;
            this.leaveForm.value.managerid = this.loginuser.reportingmanager;
            this.leavesService.addLeave(this.leaveForm.value).subscribe(
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