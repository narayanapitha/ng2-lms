import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'lms-header',
  templateUrl: './header.component.html',
  providers: [UserService]
})
export class HeaderComponent implements OnInit { 
  isAdmin: string = "";
  username: string = "";

  constructor(private userService: UserService, private authService: AuthService) {
       // get users from secure api end point
        this.userService.getUser()
            .subscribe(users => {
                this.username = users.data.username,
                this.isAdmin = users.data.role
            });
   }

    ngOnInit() {
       
            
    }
}
