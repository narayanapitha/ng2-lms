import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableResource } from 'angular-2-data-table';
import { HolidayService } from '../../service/holiday.service';
import { UserService } from '../../service/user.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'lms-holiday',
    templateUrl: 'holiday.component.html',
    providers: [HolidayService, UserService]
})
export class HolidayComponent implements OnInit {

    itemResource: any;
    items = [];
    itemCount = 0;
    success: string;
    error: string;
    isAdmin: any;
    loading: boolean = false;
    modalDel: any;
    modalData: any;

    constructor(private holidayService: HolidayService, private userService: UserService) {
        // get users from secure api end point
        this.userService.getUser()
            .subscribe(users => {
                this.isAdmin = users.data.role
            });
     }

    ngOnInit() {
		/*this.reloadItems();*/
	}

   /* reloadItems() {
        this.holidayService.listHolidays().subscribe(res => {
			this.items = res.data,
			this.itemCount = res.data.length
		});
    }*/

    reloadItems(params) {
        this.holidayService.listHolidays(params).then(result => {
            this.items = result.items;
            this.itemCount = result.count;
        });
    }

    rowTooltip(item) { return item.firstname; }

    @ViewChild('modal')
    modal: ModalComponent;

    openDeleteModal(data){
        this.modalDel = data;
        this.modal.open();
    }
	
	deleteHoliday(item) {
        this.loading = true;
        this.holidayService.deleteHoliday(item._id).subscribe(
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
        this.holidayService.getHoliday(data._id).subscribe(
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