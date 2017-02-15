import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
    selector: 'lms-myprofile',
    templateUrl: 'myprofile.component.html',
    providers: [UserService]
})
export class MyprofileComponent implements OnInit {
    
    user : any;

    constructor(
        private userService: UserService
    ) { }

    ngOnInit() { 
        this.userService.getUser().subscribe(users => {
                this.user = users.data;
        });
    }
}