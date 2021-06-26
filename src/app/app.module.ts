import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputNumberModule} from 'primeng/inputnumber';
import {SidebarModule} from 'primeng/sidebar';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import { EditRegistrationComponent } from './edit-registration/edit-registration.component';
import { HttpClientModule } from '@angular/common/http';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

const config = {
  apiKey: "AIzaSyBJTJtugDBbtYfycLYlM5rwFKI4aUh6d10",
  authDomain: "vaccregistration.firebaseapp.com",
  projectId: "vaccregistration",
  storageBucket: "vaccregistration.appspot.com",
  messagingSenderId: "768822641251",
  appId: "1:768822641251:web:73d702fa292d3f4215ae56",
  measurementId: "G-KLZRJSF0XQ"
};

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    AdminComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    EditRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    RadioButtonModule,
    DropdownModule,
    BrowserAnimationsModule,
    InputNumberModule,
    SidebarModule,
    ToastModule,
    DialogModule,
    HttpClientModule,
    ConfirmDialogModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
