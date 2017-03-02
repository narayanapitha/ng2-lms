import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
    selector: 'lms-sidebar',
    templateUrl: 'sidebar.component.html',
    providers: [UserService]
})
export class SidebarComponent implements OnInit {
    isAdmin: any;

    constructor(private userService: UserService) {
        // get users from secure api end point
        this.userService.getUser()
            .subscribe(users => {
                this.isAdmin = users.data.role
            });
     }

    ngOnInit() { }
}