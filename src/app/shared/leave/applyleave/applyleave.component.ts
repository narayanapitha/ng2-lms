import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LeavesService } from '../../../service/leaves.service';
import { UserService } from '../../../service/user.service';

@Component({
    selector: 'lms-applyleave',
    templateUrl: 'applyleave.component.html',
    providers: [LeavesService, UserService]
})
export class ApplyleaveComponent implements OnInit {
    
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
            .subscribe(users => {
                this.loginuser = users.data
            });
     }

    ngOnInit() { 
        let params: any = this.activatedRoute.snapshot.params;
        if(params.id){
            this.getLeaveData(params.id);
            this.leaveid = params.id;
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
                        startdate: [this.leaveData.startdate, Validators.required],
                        enddate: [this.leaveData.enddate, Validators.required],
                        description: [this.leaveData.description, Validators.required]
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
	
	public leaveForm = this.fb.group({
        
        leavetype: ["", Validators.required],
        startdate: ["", Validators.required],
        enddate: ["", Validators.required],
        description: ["", Validators.required]
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
                    if(data.success){
                        this.success = data.msg;
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
        }else{
            
            /*-----------add user data code ----------*/
            this.leaveForm.value.approve_status = '0';
            this.leaveForm.value.userid = this.loginuser._id;
            this.leaveForm.value.managerid = this.loginuser.reportingmanager;
            this.leavesService.addLeave(this.leaveForm.value).subscribe(
                data => {
                    if(data.success){
                        this.success = data.msg;
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
    }

}