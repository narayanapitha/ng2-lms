import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { UsersService } from '../../../service/users.service';
import { UserService } from '../../../service/user.service';

const URL = 'http://localhost:9000/api/imageupload';

@Component({
    selector: 'lms-editprofile',
    templateUrl: 'editprofile.component.html',
    providers: [UsersService, UserService]
})
export class EditprofileComponent implements OnInit {
    
    error: string;
    loading: boolean = false;
    success: string;
	userData: any;
    updatePage: boolean = false;
    userid: string;
    imageupload: number;
    imageUrl: string = '';

    constructor(private fb: FormBuilder, private router: Router, private users: UsersService, private user: UserService, private activatedRoute: ActivatedRoute) {
    }

    public uploader:FileUploader = new FileUploader(
        {url: URL }
    );
	
	ngOnInit() {
		let params: any = this.activatedRoute.snapshot.params;
        if(params.id){
            this.getUserData(params.id);
            this.userid = params.id;
        }

        //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
       this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
       //overide the onCompleteItem property of the uploader so we are 
       //able to deal with the server response.
       this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            var responsePath = JSON.parse(response);
            //console.log(responsePath);// the url will be in the response
            this.imageUrl = responsePath.msg;
            this.imageupload = 1;
        };
		
	}	
	
	getUserData(id){
		this.users.getUser(id).subscribe(
            data => {
                if(data.success){
                    this.userData = data.data;
                    this.imageUrl = this.userData.photo;
                    this.imageupload = 0;
                    this.updatePage = true;
                    this.editUserForm = this.fb.group({
                        firstname: [this.userData.firstname, Validators.required],
                        lastname: [this.userData.lastname, Validators.required],
                        file: [""],
                        birthday: [this.userData.birthday, Validators.required],
                        gender: [this.userData.gender, Validators.required],
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
	
	public editUserForm = this.fb.group({
        
        firstname: ["", Validators.required],
        lastname: ["", Validators.required],
        file: [""],
        birthday: ["", Validators.required],
        gender: ["", Validators.required],
        phone: [""],
        address: [""]
    });

    submitForm() {
        this.loading = true;
		this.error = "";
		this.success = "";

        /*-----------edit user data code ----------*/
        this.editUserForm.value.id = this.userid;
        this.editUserForm.value.photo = this.imageUrl;
        this.editUserForm.value.uploadimg = this.imageupload;
        this.users.editUserProfile(this.editUserForm.value).subscribe(
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