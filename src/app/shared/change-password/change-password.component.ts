import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';


@Component({
    selector: 'lms-change-password',
    templateUrl: 'change-password.component.html',
    providers: [UserService]
})
export class ChangePasswordComponent implements OnInit {
    
    error: string;
    loading: boolean = false;
    success: string;
	loggedInData: any;

    constructor(private fb: FormBuilder, private user: UserService) {
    }

    
	ngOnInit() {
        this.user.getUser().subscribe(user => {
                this.loggedInData = user.data
        });
	}	

    public changePassForm = this.fb.group({
        currentpassword: ["", Validators.required],
        newpassword: ["", Validators.required],
        renewpassword: ["", Validators.required]
    });

    submitForm() {
        this.loading = true;
		this.error = "";
		this.success = "";

        this.changePassForm.value.uid = this.loggedInData._id
        /*-----------edit user data code ----------*/
        this.user.changeUserPassword(this.changePassForm.value).subscribe(
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