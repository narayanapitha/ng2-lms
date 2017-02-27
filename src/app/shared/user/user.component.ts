import { Component, OnInit } from '@angular/core';
import { DataTableResource } from 'angular-2-data-table';
//import persons from './userdata';
import { AdduserService } from '../../service/adduser.service';

@Component({
    selector: 'lms-user',
    templateUrl: 'user.component.html',
	providers: [AdduserService]
})
export class UserComponent implements OnInit {

    itemResource: any;
    items = [];
    itemCount = 0;
    success: string;
    error: string;
    loading: boolean = false;

    constructor(private adduserService: AdduserService) {
        this.adduserService.listusers().subscribe(res => {
			/*this.items = res.data,
			this.itemCount = res.data.length*/
		});		
    }

    ngOnInit() {
		this.reloadItems();
	}
	
    reloadItems() {
        this.adduserService.listusers().subscribe(res => {
			this.items = res.data,
			this.itemCount = res.data.length
		});
    }

    rowTooltip(item) { return item.firstname; }
	
	deleteUser(item) {
        this.loading = true;
        this.adduserService.deleteUser(item._id).subscribe(
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