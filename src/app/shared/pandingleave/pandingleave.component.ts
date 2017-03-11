import { Component, OnInit, Directive, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataTableResource } from 'angular-2-data-table';
import { LeavesService } from '../../service/leaves.service';
import { UserService } from '../../service/user.service';

@Component({
    selector: 'lms-pandingleave',
    templateUrl: 'pandingleave.component.html',
    providers: [UserService, LeavesService]
})
export class PandingleaveComponent implements OnInit {
    
    itemResource: any;
    items = [];
    itemCount = 0;
    success: string;
    error: string;
    isAdmin: any;
    userid: any;
    loading: boolean = false;
    userData: any;

    constructor(private fb: FormBuilder, private userService: UserService, private leavesService: LeavesService) {
        // get users from secure api end point
        this.userService.getUser()
            .subscribe(users => {
                this.userid = users.data._id,
                this.isAdmin = users.data.role
            }); 
     }
     

    ngOnInit() {
		//this.reloadItems();
	}
	
    reloadItems() {      
        this.userService.getUser()
        .flatMap(user => this.leavesService.listLeavesByManager(user.data))
        .subscribe(res => {
            this.items = res.data,
            this.itemCount = res.data.length
        }); 
    }

    rowTooltip(item) { return item.leavetype; }
	
	deleteLeave(item) {
        this.loading = true;
        this.leavesService.deleteLeave(item._id).subscribe(
			data => {
                this.loading = false;
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
        });	
        this.reloadItems();
    }

    public approveLeaveForm = this.fb.group({ 
        comment: ["", Validators.required]
    });

    approveLeave(item) {
        this.loading = true;
        let makeapprove = (item.approve=='1') ? '0' : '1';
        let data = {
            approve_status: makeapprove,
            id: item._id
        };
        this.leavesService.approveLeave(data).subscribe(
			data => {
                this.loading = false;
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
        });	
    }
}