import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'lms-header',
  templateUrl: './header.component.html',
  providers: [UserService]
})
export class HeaderComponent implements OnInit { 
  
  username: string = "";

  constructor(private userService: UserService, private authService: AuthService) { }

    ngOnInit() {
        // get users from secure api end point
        this.userService.getUser()
            .subscribe(users => {
                this.username = users.data.username;
            });
    }
}
