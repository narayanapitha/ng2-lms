import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FileUploadModule } from 'ng2-file-upload';
import { TooltipModule  } from 'ng2-bootstrap';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DataTableModule } from 'angular-2-data-table';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { PageNotFoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { ContactusComponent } from './shared/contactus/contactus.component';
import { HolidayComponent } from './shared/holiday/holiday.component';
import { NewholidayComponent } from './shared/holiday/newholiday/newholiday.component';
import { UserComponent } from './shared/user/user.component';
import { NewuserComponent } from './shared/user/newuser/newuser.component';
import { AuthGuard } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { MyleaveComponent } from './shared/leave/myleave.component';
import { ApplyleaveComponent } from './shared/leave/applyleave/applyleave.component';
import { PandingleaveComponent } from './shared/pandingleave/pandingleave.component';
import { MyprofileComponent } from './shared/myprofile/myprofile.component';
import { EditprofileComponent } from './shared/myprofile/editprofile/editprofile.component';
import { SettingsComponent } from './shared/settings/settings.component';
import { ControlMessagesComponent } from './shared/validation/message.component';
import { ValidationService } from './shared/validation/validation.service';
import { ChangePasswordComponent } from './shared/change-password/change-password.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    
  },
  { 
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'holiday',
    component: HolidayComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'holiday/new',
    component: NewholidayComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'holiday/:id',
    component: NewholidayComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contactus',
    component: ContactusComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/new',
    component: NewuserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/:id',
    component: NewuserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myleave',
    component: MyleaveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myleave/new',
    component: ApplyleaveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myleave/:id',
    component: ApplyleaveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pandingleave',
    component: PandingleaveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myprofile',
    component: MyprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myprofile/:id',
    component: EditprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    DataTableModule,
    Ng2Bs3ModalModule,
    FileUploadModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    TooltipModule.forRoot(),
    MyDatePickerModule,
    MyDateRangePickerModule
  ],
  declarations: [
    ControlMessagesComponent,
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ContactusComponent,
    HolidayComponent,
    NewholidayComponent,
    LoginComponent,
    UserComponent,
    NewuserComponent,
    MyleaveComponent,
    ApplyleaveComponent,
    PandingleaveComponent,
    MyprofileComponent,
    EditprofileComponent,
    SettingsComponent,
    ChangePasswordComponent
  ],
  providers: [
    AUTH_PROVIDERS,
    AuthService,
    AuthGuard,
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
