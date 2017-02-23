import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
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
import { MyleaveComponent } from './shared/leave/myleave/myleave.component';
import { ApplyleaveComponent } from './shared/leave/myleave/applyleave/applyleave.component';
import { MyprofileComponent } from './shared/myprofile/myprofile.component';

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
    path: 'myleave/apply',
    component: ApplyleaveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myprofile',
    component: MyprofileComponent,
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
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  declarations: [
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
    MyprofileComponent
  ],
  providers: [
    AUTH_PROVIDERS,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
