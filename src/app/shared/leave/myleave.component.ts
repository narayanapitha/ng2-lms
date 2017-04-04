import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableResource } from 'angular-2-data-table';
import { LeavesService } from '../../service/leaves.service';
import { UserService } from '../../service/user.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {Observable} from "rxjs/Rx";

@Component({
    selector: 'lms-myleave',
    templateUrl: 'myleave.component.html',
    providers: [UserService, LeavesService]
})
export class MyleaveComponent implements OnInit {
    
    itemResource: any;
    items = [];
    itemCount = 0;
    success: string;
    error: string;
    isAdmin: any;
    userid: any;
    loading: boolean = false;
    modalData: any;
    modalDel: any;
    loggedInData: any;
    settingData: any;

    constructor(private userService: UserService, private leavesService: LeavesService) {
        // get users from secure api end point
        this.userService.getUser()
            .toPromise()
            .then(users => {
                this.userid = users.data._id,
                this.isAdmin = users.data.role,
                this.loggedInData = users.data
               
            }); 

        this.userService.getSetting().subscribe(res => this.settingData = res);  
        
     }
     

    ngOnInit() {
        
	}
	

    reloadItems(params) {
        this.userService.getUser()
        .flatMap(user => this.leavesService.listLeavesByUser(user.data, params))
        .subscribe(res => {
            this.items = res.items,
            this.itemCount = res.count;
        }); 
    }

    rowTooltip(item) { return item.leavetype; }
	
    @ViewChild('modal')
    modal: ModalComponent;

    openDeleteModal(data){
        this.modalDel = data;
        this.modal.open();
    }

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
        //this.reloadItems();
    }

    @ViewChild('modalView')
    modalView: ModalComponent;

    openViewModal(data){
        this.leavesService.getLeaves(data._id).subscribe(
			data => {
                this.loading = false;
                if(data.success){
                    this.modalData = data.data;
                }else{
                    this.error = data.msg;
                }
            },
            error => {
            this.error = error.msg;
        });	

        this.modalView.open();
    }

    closeModal(){
        this.modal.close();
        this.modalView.close();
    }

}