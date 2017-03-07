import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../../../service/users.service';
import { UserService } from '../../../service/user.service';
@Component({
    selector: 'lms-newuser',
    templateUrl: 'newuser.component.html',
    providers: [UsersService, UserService]
})
export class NewuserComponent implements OnInit {
    
    error: string;
    loading: boolean = false;
    success: string;
	userData: any;
    loginmember: any;
    managers: any;
    updatePage: boolean = false;
    userid: string;

    constructor(private fb: FormBuilder, private router: Router, private user: UsersService, private loginuser: UserService, private activatedRoute: ActivatedRoute) {
        this.loginuser.getUser()
            .subscribe(users => {
                this.loginmember = users.data
            });
    }
	
	ngOnInit() {
		let params: any = this.activatedRoute.snapshot.params;
        if(params.id){
            this.getUserData(params.id);
            this.userid = params.id;
        }

        this.user.listManagers().subscribe(data => {
            this.managers = data.data;
        });
		
	}	
	
	getUserData(id){
		this.user.getUser(id).subscribe(
            data => {
                if(data.success){
                    this.userData = data.data;
                    this.updatePage = true;
                    this.userForm = this.fb.group({
                        firstname: [this.userData.firstname, Validators.required],
                        lastname: [this.userData.lastname, Validators.required],
                        photo: [""],
                        email: [this.userData.emailaddress, Validators.required],
                        birthday: [this.userData.birthday, Validators.required],
                        role: [this.userData.role, Validators.required],
                        gender: [this.userData.gender, Validators.required],
                        reportingmanager: [this.userData.reportingmanager, Validators.required],
                        employmentdate: [this.userData.employmentdate, Validators.required],
                        phone: [this.userData.phone],
                        address: [this.userData.address]
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

        if(this.userid){
            //-----------edit user data code ----------
            this.userForm.value.id = this.userid;
            this.user.editUser(this.userForm.value).subscribe(
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
        }else{
            //-----------add user data code ----------
            this.userForm.value.username = this.userForm.value.email;
            this.userForm.value.password = "test";
            this.user.addUser(this.userForm.value).subscribe(
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
}