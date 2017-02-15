import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'lms-login',
    templateUrl: 'login.component.html',
    providers: [AuthService]
})
export class LoginComponent {
  
  error: string;
  loading: boolean = false;
  
  public loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  });
   
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
      
  }
  
  onLogin(credentials) {
    this.loading = true;
    this.error = "";
    this.auth.login(this.loginForm.value).subscribe(
        data => {
            if(data.token){
              localStorage.setItem('id_token', data.token);
              this.router.navigateByUrl('/');
              this.loading = false;
            }else{
              this.error = "Invalid token. Try again !!!";
            }
            
        },
        error => {
          this.error = "Authentication fail. Try again !!!";
          this.loading = false;
        }
      );  
  }
}