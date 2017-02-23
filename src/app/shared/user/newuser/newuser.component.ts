import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdduserService } from '../../../service/adduser.service'
@Component({
    selector: 'lms-newuser',
    templateUrl: 'newuser.component.html',
    providers: [AdduserService]
})
export class NewuserComponent implements OnInit {
    
    error: string;
    loading: boolean = false;
    success: string;
	userData: any;

    constructor(private fb: FormBuilder, private router: Router, private user: AdduserService, private activatedRoute: ActivatedRoute) {
		
		//getUserData(params.id);	
    }
	
	ngOnInit() {
		let params: any = this.activatedRoute.snapshot.params;
		this.getUserData(params.id);
	}	
	
	getUserData(id){
		this.user.getUser(id).subscribe(
            data => {
                if(data.success){
                    this.success = data.msg;
                    this.loading = false;
                }else{
                    this.error = data.msg;
                }
            },
            error => {
            this.error = error.msg;
            this.loading = false;
            }
        );
	}
	
	public userForm = this.fb.group({
        firstname: ["", Validators.required],
        lastname: ["", Validators.required],
        photo: [""],
        email: ["", Validators.required],
        birthday: ["", Validators.required],
        role: ["", Validators.required],
        gender: ["", Validators.required],
        reportingmanager: ["", Validators.required],
        employmentdate: ["", Validators.required],
        phone: [""],
        address: [""]
    });

    submitForm() {
		this.loading = true;
		this.error = "";
		this.success = "";
		this.userForm.value.username = this.userForm.value.email;
		this.userForm.value.password = "test";
		console.log("this.userForm.value ->"+this.userForm.value);
		this.user.addUser(this.userForm.value).subscribe(
            data => {
                if(data.success){
                    this.success = data.msg;
                    this.loading = false;
                }else{
                    this.error = data.msg;
                }
            },
            error => {
            this.error = error.msg;
            this.loading = false;
            }
        );  
    }

}