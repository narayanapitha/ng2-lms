import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableResource } from 'angular-2-data-table';
//import persons from './userdata';
import { UsersService } from '../../service/users.service';
import { UserService } from '../../service/user.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'lms-user',
    templateUrl: 'user.component.html',
	providers: [UsersService, UserService]
})
export class UserComponent implements OnInit {

    itemResource: any;
    items = [];
    itemCount = 0;
    success: string;
    error: string;
    isAdmin: any;
    loading: boolean = false;
    modalDel: any;
    modalData: any;
    //loggedInData: any;

    constructor(private usersService: UsersService, private userService: UserService) {
       // get users from secure api end point
        this.userService.getUser()
            .subscribe(users => {
                this.isAdmin = users.data.role
                //this.loggedInData = users.data
            });
    }

    ngOnInit() {

	}

    reloadItems(params) {

        this.userService.getUser()
        .flatMap(user => this.usersService.listusers(user.data, params))
        .subscribe(res => {
            this.items = res.items,
            this.itemCount = res.count;
        }); 

       /* this.usersService.listusers(params).then(result => {
            this.items = result.items;
            this.itemCount = result.count;
        });*/
    }

    rowTooltip(item) { return item.firstname; }

    @ViewChild('modal')
    modal: ModalComponent;

    openDeleteModal(data){
        this.modalDel = data;
        this.modal.open();
    }

	deleteUser(item) {
        this.loading = true;
        this.usersService.deleteUser(item._id).subscribe(
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

    @ViewChild('modalView')
    modalView: ModalComponent;

    openViewModal(data){
        this.usersService.getUser(data._id).subscribe(
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