import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { PageNotFoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { ContactusComponent } from './shared/contactus/contactus.component';
import { HolidayComponent } from './shared/holiday/holiday.component';
import { AuthGuard } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

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
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'holiday',
    component: HolidayComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contactus',
    component: ContactusComponent,
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
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ContactusComponent,
    HolidayComponent,
    LoginComponent
  ],
  providers: [
    AUTH_PROVIDERS,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
