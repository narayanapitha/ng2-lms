import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';


@Component({
    selector: 'lms-settings',
    templateUrl: 'settings.component.html',
    providers: [UserService]
})
export class SettingsComponent implements OnInit {
    
    error: string;
    loading: boolean = false;
    success: string;
	settingData: any;

    constructor(private fb: FormBuilder, private user: UserService) {
    }

    
	ngOnInit() {
        this.getSettingData();
	}	

    getSettingData(){
        this.loading = true;
		this.error = "";
		this.success = "";

        this.user.getSetting().subscribe(
            data => {
                if(data.success){
                    this.settingData = data.data;
                    this.settingForm = this.fb.group({
                        leavepermonth: [this.settingData.leavepermonth, Validators.required],
                        leaveperyear: [this.settingData.leaveperyear, Validators.required],
                        leavesstartmonth: [this.settingData.leavesstartmonth, Validators.required]
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
    
    public settingForm = this.fb.group({
        leavepermonth: ["", Validators.required],
        leaveperyear: ["", Validators.required],
        leavesstartmonth: ["", Validators.required]
    });

    submitForm() {
        this.loading = true;
		this.error = "";
		this.success = "";

        /*-----------edit user data code ----------*/
        this.user.editSetting(this.settingForm.value).subscribe(
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