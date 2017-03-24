import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { UsersService } from '../../../service/users.service';
import { UserService } from '../../../service/user.service';


const URL = 'http://localhost:9000/api/imageupload';

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
    imageUrl: string = '';
    settingData: any;

    constructor(private fb: FormBuilder, private router: Router, private user: UsersService, private loginuser: UserService, private activatedRoute: ActivatedRoute) {
        this.loginuser.getUser()
            .subscribe(users => {
                this.loginmember = users.data
            });
    }
	
    public uploader:FileUploader = new FileUploader(
        {url: URL }
    );

	ngOnInit() {
        this.loginuser.getSetting().subscribe(data => { 
            this.settingData = data.data;
            this.userForm = this.fb.group({
                firstname: ["", Validators.required],
                lastname: ["", Validators.required],
                file: [""],
                email: ["", Validators.required],
                birthday: ["", Validators.required],
                role: ["", Validators.required],
                gender: ["", Validators.required],
                reportingmanager: ["", Validators.required],
                employmentdate: ["", Validators.required],
                phone: [""],
                address: [""],
                leaveperyearval: [this.settingData.leaveperyear, Validators.required]
            });
         });

		let params: any = this.activatedRoute.snapshot.params;
        if(params.id){
            this.getUserData(params.id);
            this.userid = params.id;
        }

        this.user.listManagers().subscribe(data => { this.managers = data.data; });

        //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
       this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
       //overide the onCompleteItem property of the uploader so we are 
       //able to deal with the server response.
       this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            var responsePath = JSON.parse(response);
            //console.log(responsePath);// the url will be in the response
            this.imageUrl = responsePath.msg;
        };
        
		
	}	
	
	getUserData(id){
		this.user.getUser(id).subscribe(
            data => {
                if(data.success){
                    this.userData = data.data;
                    this.imageUrl = this.userData.photo;
                    this.updatePage = true;
                    this.userForm = this.fb.group({
                        firstname: [this.userData.firstname, Validators.required],
                        lastname: [this.userData.lastname, Validators.required],
                        file: [""],
                        email: [this.userData.emailaddress, Validators.required],
                        birthday: [this.userData.birthday, Validators.required],
                        role: [this.userData.role, Validators.required],
                        gender: [this.userData.gender, Validators.required],
                        reportingmanager: [this.userData.reportingmanager, Validators.required],
                        employmentdate: [this.userData.employmentdate, Validators.required],
                        phone: [this.userData.phone],
                        address: [this.userData.address],
                        leaveperyearval: [(this.userData.leaveperyear!= null && this.userData.leaveflag!= 0) ? this.userData.leaveperyear : this.settingData.leaveperyear, Validators.required]
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
        file: [""],
        email: ["", Validators.required],
        birthday: ["", Validators.required],
        role: ["", Validators.required],
        gender: ["", Validators.required],
        reportingmanager: ["", Validators.required],
        employmentdate: ["", Validators.required],
        phone: [""],
        address: [""],
        leaveperyearval: ["", Validators.required]
    });


    submitForm() {
        this.loading = true;
		this.error = "";
		this.success = "";

        if(this.userForm.value.leaveperyearval !== this.settingData.leaveperyear){
            this.userForm.value.leaveperyear = this.userForm.value.leaveperyearval;
            this.userForm.value.leaveflag = 1;
        }else{
            this.userForm.value.leaveperyear = '';
            this.userForm.value.leaveflag = 0; 
        }

        if(this.userid){
            //-----------edit user data code ----------
            this.userForm.value.id = this.userid;
            this.userForm.value.photo = this.imageUrl;
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
            this.userForm.value.photo = this.imageUrl;
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