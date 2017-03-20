import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
    selector: 'lms-myprofile',
    templateUrl: 'myprofile.component.html',
    providers: [UserService]
})
export class MyprofileComponent implements OnInit {
    
    user : any;
    imageName: string  = '';

    constructor(
        private userService: UserService
    ) { }

    ngOnInit() { 
        this.userService.getUser().subscribe(users => {
                this.user = users.data,
                this.imageName = !users.data.photo  ? 'default.png' :  users.data.photo
        });
    }
}