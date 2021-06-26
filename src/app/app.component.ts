import { JwtTokenSenderService } from './registration/services/jwt-token-sender.service';
import { WindowService } from './registration/services/window.service';
import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationButtonServiceService } from './shared/services/registration-button-service.service';
import firebase from 'firebase/app';

import 'firebase/analytics';

import 'firebase/auth';
import 'firebase/firestore';
import { EditRegistrationComponent } from './edit-registration/edit-registration.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService, RegistrationButtonServiceService],
})
export class AppComponent implements OnInit, DoCheck {
  @ViewChild('registration')
  editRegistrationComponent!: EditRegistrationComponent;
  public toggleOTPVisibility = false;
  public phoneNo!: number;
  public displayModal = false;
  public mobileFirstTwo: string = '';
  public mobileLastThree: string = '';
  public buttonToggle = true;
  public windowRef: any;
  public appendedPhoneNumber!: string;
  public appVerifier: any;
  public firebaseConfig = {
    apiKey: 'AIzaSyBJTJtugDBbtYfycLYlM5rwFKI4aUh6d10',
    authDomain: 'vaccregistration.firebaseapp.com',
    projectId: 'vaccregistration',
    storageBucket: 'vaccregistration.appspot.com',
    messagingSenderId: '768822641251',
    appId: '1:768822641251:web:73d702fa292d3f4215ae56',
    measurementId: 'G-KLZRJSF0XQ',
  };
  title = 'covid-app';
  registrationForm = new FormGroup({
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.min(1000000000),
      Validators.max(9999999999),
    ]),
    otpvalue: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  });
  constructor(
    private registrationButtonServiceService: RegistrationButtonServiceService,
    private router: Router,
    private windowService: WindowService,
    private jwtTokenService: JwtTokenSenderService,
    private messageService: MessageService
  ) {}

  ngDoCheck(): void {
    this.buttonToggle =
      this.registrationButtonServiceService.getButtonVisibility();
  }
  ngOnInit(): void {
    firebase.initializeApp(this.firebaseConfig);
    firebase.analytics();
  }
  public showMaximizableDialog(): void {
    this.registrationForm.reset();
    this.displayModal = true;
    this.windowRef = this.windowService.windowRef;
    this.sleep(2000).then(() => {
      try {
        this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          'recaptcha-container'
        );
        this.windowRef.recaptchaVerifier.render();
      } catch (e) {
      }
    });
  }

  public sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public showFormControlInvalid(formContols: AbstractControl): boolean {
    return formContols.invalid && (formContols.dirty || formContols.touched);
  }

  public toggleOTPVisibilityController(): void {
    this.phoneNo = this.registrationForm.get('phoneNo')?.value;
    this.mobileFirstTwo = this.phoneNo.toString().substring(0, 2);
    this.mobileLastThree = this.phoneNo.toString().substring(7);
    this.appVerifier = this.windowRef.recaptchaVerifier;
    this.appendedPhoneNumber = '+91' + this.phoneNo;
    this.jwtTokenService.sendPhoneNo(this.appendedPhoneNumber).subscribe(
      () => {
        firebase
          .auth()
          .signInWithPhoneNumber(this.appendedPhoneNumber, this.appVerifier)
          .then((result) => {
            this.windowRef.confirmationResult = result;
            this.toggleOTPVisibility = !this.toggleOTPVisibility;
          })
          .catch((error)=>{
            this.messageService.add({
              severity: 'error',
              summary: 'Request failed',
              detail: error.message,
            });
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Not a Registered User',
          detail: 'User is not Registered',
        });
      }
    );
  }
  public verifyCredentials() {
    this.registrationButtonServiceService.setButtonVisibility(false);
    this.windowRef.confirmationResult
      .confirm(this.registrationForm.get('otpvalue')?.value)
      .then((result: any) => {
        localStorage.setItem('Firebase Token', result.user.Aa);
        this.jwtTokenService.sendJwtToken(result.user.Aa).subscribe((data) => {
          localStorage.setItem('token', data);
          this.router.navigate(['/edit-registration']);
        });
      })
      .catch((error: any) => {});
    this.displayModal = false;
  }
  public logOut() {
    this.registrationButtonServiceService.setButtonVisibility(true);
    window.location.href = '/registration';
    localStorage.clear();
  }
  public formReset() {
    this.registrationForm.reset();
  }
  public resendOTP() {
    const temp = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
    });
    firebase.auth().settings.appVerificationDisabledForTesting = true;
    firebase
      .auth()
      .signInWithPhoneNumber(this.appendedPhoneNumber, temp)
      .then((result) => {
        this.windowRef.confirmationResult = result;
      })
      .catch();
  }
}
