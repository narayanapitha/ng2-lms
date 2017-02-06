import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    selector: 'lms-login',
    templateUrl: 'login.component.html',
    providers: [AuthService]
})
export class LoginComponent {
  
  error: string;
  
  public loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  });
   
  constructor(private fb: FormBuilder, private auth: AuthService) {
      
  }
  
  onLogin(credentials) {
    this.auth.login(this.loginForm.value);
    if(localStorage.getItem('id_token')==null){
        this.error = "Authentication fail. Try again !!!";
    }
  }
}