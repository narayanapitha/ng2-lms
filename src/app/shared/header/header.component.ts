import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'lms-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent { 
  constructor(private auth: AuthService){}
}
