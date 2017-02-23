import { Component, OnInit } from '@angular/core';
import { DataTableResource } from 'angular-2-data-table';
//import persons from './userdata';
import { AdduserService } from '../../service/adduser.service';

@Component({
    selector: 'lms-user',
    templateUrl: 'user.component.html',
	providers: [AdduserService]
})
export class UserComponent {
    
    items = [];
    itemCount = 0;

    constructor(private adduserService: AdduserService) {
        this.adduserService.listusers().subscribe(res => {
			this.items = res.data,
			this.itemCount = res.data.length
		});		
    }
	
    reloadItems() {
        this.adduserService.listusers().subscribe(res => {
			this.items = res.data,
			this.itemCount = res.data.length
		});
    }

    rowTooltip(item) { return item.firstname; }
	
	editUser(item) {
        alert(item._id);
    }
	
	deleteUser(item) {
        alert(item._id);
    }
}