import { Component, OnInit } from '@angular/core';
import { DataTableResource } from 'angular-2-data-table';
//import persons from './userdata';
import { UsersService } from '../../service/users.service';
import { UserService } from '../../service/user.service';

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

    constructor(private usersService: UsersService, private userService: UserService) {
       // get users from secure api end point
        this.userService.getUser()
            .subscribe(users => {
                this.isAdmin = users.data.role
            });
    }

    ngOnInit() {
		//this.reloadItems();
	}
	
    reloadItems() {
        this.usersService.listusers().subscribe(res => {
			this.items = res.data,
			this.itemCount = res.data.length
		});
    }

    rowTooltip(item) { return item.firstname; }


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
        this.reloadItems();
    }
}