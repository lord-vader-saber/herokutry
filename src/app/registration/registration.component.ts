
import { MemberDetails } from './model/member-detail.model';
import { Component, DoCheck, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { GetmemberdataService } from './services/getmemberdata.service';
import { RegistrationButtonServiceService } from '../shared/services/registration-button-service.service';
import { UserDetailsService } from './services/user-details.service';
import { WindowService } from './services/window.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [
    MessageService,
    GetmemberdataService,
    RegistrationButtonServiceService,
    UserDetailsService,
    ConfirmationService
  ],
})
export class RegistrationComponent implements OnInit, DoCheck {
  public appVerifier: any;
  public appendedPhoneNumber!: string;
  public isCapchaPopulated = true;
  public phoneNo!: number;
  public windowRef: any;
  public profileFormPhoneNumber!: number;
  public displayModal: boolean = false;
  public toggleOTPVisibility = false;
  public memberDetails: MemberDetails[] = [];
  public backupTypeDropdownOptions: SelectItem[];
  public previousVaccineTypeOptions: SelectItem[];
  public idProof: SelectItem[];
  public visibleSidebar2 = false;
  public visibleSidebar3 = false;
  public editIndex = 0;
  public counter = 1;
  public showColumn: boolean[] = [true, false, false, false, false, false];
  public totalMembers = 0;
  public allMemberDetailsData: MemberDetails[] = [];
  public firstName1 = '';
  public lastName1 = '';
  public phoneNo1 = '';
  public firstName2 = '';
  public lastName2 = '';
  public phoneNo2 = '';
  public firstName3 = '';
  public lastName3 = '';
  public phoneNo3 = '';
  public firstName4 = '';
  public lastName4 = '';
  public phoneNo4 = '';
  public firstName5 = '';
  public lastName5 = '';
  public phoneNo5 = '';
  public saveMemberDetailsData: any;
  public dupProfileForm: any;

  public isCapchaPresent: boolean = true;
  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    idNo: new FormControl(''),
    idProof: new FormControl(''),
    gender: new FormControl('Male', Validators.required),
    location: new FormControl('Hyderabad'),
    dose: new FormControl('First', Validators.required),
    yob: new FormControl(null, [
      Validators.required,
      Validators.min(1800),
      Validators.max(2021),
    ]),
    previousVaccineType: new FormControl(''),
    registeredInCowin: new FormControl(false, Validators.required),
    beneficiaryReferenceId: new FormControl(''),
  });

  memberForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    idNo: new FormControl(''),
    idProof: new FormControl(''),
    gender: new FormControl('Male', Validators.required),
    dose: new FormControl('First', Validators.required),
    yob: new FormControl(null, [
      Validators.required,
      Validators.min(1800),
      Validators.max(2021),
    ]),
    previousVaccineType: new FormControl(''),
    registeredInCowin: new FormControl(false, Validators.required),
    beneficiaryReferenceId: new FormControl(''),
  });

  updateForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    idNo: new FormControl(''),
    idProof: new FormControl(''),
    gender: new FormControl('Male', Validators.required),
    dose: new FormControl('First', Validators.required),
    yob: new FormControl([
      Validators.required,
      Validators.min(1800),
      Validators.max(2021),
    ]),
    previousVaccineType: new FormControl(''),
    registeredInCowin: new FormControl(false, Validators.required),
    beneficiaryReferenceId: new FormControl(''),
  });

  registrationForm = new FormGroup({
    otpvalue: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  });

  ngOnInit(): void {
    this.allMemberDetailsData = this.getMemberDataService.x;
    this.profileForm.markAsUntouched();
    this.profileForm.markAsPristine();
  }

  constructor(
    private messageService: MessageService,
    private getMemberDataService: GetmemberdataService,
    private registrationButtonServiceService: RegistrationButtonServiceService,
    private userDetailsService: UserDetailsService,
    private windowService: WindowService,
    private confirmationService: ConfirmationService,
  ) {
    this.backupTypeDropdownOptions = [
      { label: 'Hyderabad', value: 'Hyderabad' },
      { label: 'Bangalore', value: 'Bangalore' },
      { label: 'Chennai', value: 'Chennai' },
      { label: 'Pune', value: 'Pune' },
      { label: 'Vishakhapatnam', value: 'Vishakhapatnam' },
    ];

    this.previousVaccineTypeOptions = [
      { label: 'Covaxin', value: 'Covaxin' },
      { label: 'Covishield', value: 'Covishield' },
      { label: 'Sputnik V', value: 'Sputnik V' },
      { label: 'Pfizer', value: 'Pfizer' },
      { label: 'Other', value: 'Other' },
    ];
    this.idProof = [
      { label: 'Id Proof', value: '' },
      { label: 'Aadhar Card', value: 'Aadhar' },
      { label: 'PAN Card', value: 'PAN Card' },
      { label: 'Driving License', value: 'Driving License' },
      { label: 'Passport', value: 'Passport' },
      { label: 'Pension Passbook', value: 'Pension Passbook' },
      { label: 'VoterID', value: 'VoterID' },
      { label: 'Ration Card with Photo', value: 'Ration Card with Photo' },
      { label: 'Unique Disablity ID', value: 'Unique Disablity ID' },
      { label: 'NPR Smart Card', value: 'NPR Smart Card' },
    ];
  }
  ngDoCheck(): void {
    this.registrationButtonServiceService.setButtonVisibility(true);
  }

  public setValidator(b: boolean) {
    if (b === true) {
      this.profileForm
        .get('beneficiaryReferenceId')
        ?.setValidators([Validators.required]);
      this.profileForm.get('beneficiaryReferenceId')?.updateValueAndValidity();
    }
    if (b === false) {
      this.profileForm.get('beneficiaryReferenceId')?.clearValidators();
      this.profileForm.get('beneficiaryReferenceId')?.updateValueAndValidity();
    }
  }

  public setMemberFormValidator(b: boolean) {
    if (b === true) {
      this.memberForm
        .get('beneficiaryReferenceId')
        ?.setValidators([Validators.required]);
      this.memberForm.get('beneficiaryReferenceId')?.updateValueAndValidity();
    }
    if (b === false) {
      this.memberForm.get('beneficiaryReferenceId')?.clearValidators();
      this.memberForm.get('beneficiaryReferenceId')?.updateValueAndValidity();
    }
  }

  public setUpdatedEditedMemberFormValidator(b: boolean) {
    if (b === true) {
      if (this.updateForm.get('registeredInCowin')?.value === true) {
        this.updateForm
          .get('beneficiaryReferenceId')
          ?.setValidators([Validators.required]);
        this.updateForm.get('beneficiaryReferenceId')?.updateValueAndValidity();
      } else {
        this.updateForm.get('beneficiaryReferenceId')?.clearValidators();
        this.updateForm.get('beneficiaryReferenceId')?.updateValueAndValidity();
      }
    }
  }

  public sendOTP(): void {
    this.appVerifier = this.windowRef.recaptchaVerifier;
    this.appendedPhoneNumber = '+91' + this.profileFormPhoneNumber;
    firebase
      .auth()
      .signInWithPhoneNumber(this.appendedPhoneNumber, this.appVerifier)
      .then((result) => {
        this.windowRef.confirmationResult = result;
        this.toggleOTPVisibility = !this.toggleOTPVisibility;
        this.isCapchaPresent= false;
      })
      .catch((error)=>{
        this.messageService.add({
          severity: 'error',
          summary: 'Request failed',
          detail: error.message,
        });
      });
  }

  public verifyCredentials() {
    this.registrationButtonServiceService.setButtonVisibility(false);
    this.windowRef.confirmationResult
      .confirm(this.registrationForm.get('otpvalue')?.value)
      .then((result: any) => {
        let phoneNo1 = this.profileForm.get('phoneNo')?.value;
        phoneNo1 = '+91' + phoneNo1;
        let dupProfileForm1 = this.profileForm;
        dupProfileForm1.patchValue({ phoneNo: phoneNo1 });

        const temp = this.getMemberDataService.x;
        const temp1 = dupProfileForm1.value;
        this.saveMemberDetailsData = {
          members: temp,
          primaryUser: {
            ...temp1,
          },
        };
        this.userDetailsService.sendSaveUserDetailsData(
          this.saveMemberDetailsData
        ).subscribe((result)=>{
         let registrationFormObject = {
          otpvalue:''
         }
         this.registrationForm.reset(registrationFormObject);
         let profileFormObject = {
          firstName: '',
          lastName: '',
          email: '',
          phoneNo: '',
          idNo: '',
          idProof: '',
          gender: 'Male',
          location: '',
          dose: 'First',
          yob: null,
          previousVaccineType: '',
          registeredInCowin: false,
          beneficiaryReferenceId: '',
         }
         this.firstName1='';
         this.firstName2= '';
         this.firstName3= '';
         this.firstName4 = '';
         this.firstName5 = '';
         this.lastName1='';
         this.lastName2= '';
         this.lastName3= '';
         this.lastName4 = '';
         this.lastName5 = '';
         this.phoneNo1='';
         this.phoneNo2='';
         this.phoneNo3='';
         this.phoneNo4='';
         this.phoneNo5='';
         this.showColumn= [true, false, false, false, false, false]; 
         this.profileForm.reset(profileFormObject);
         this.displayModal = false;
        },
        (error)=> {
          this.messageService.add({
            severity: 'error',
            summary: 'Request failed',
            detail: 'User already registered',
          });
          var res = phoneNo1.substring(3, 13);
          dupProfileForm1.patchValue({ phoneNo: res });

        });
      })
      .catch((error: any) => {

      });
  }
  public confirm2(event:any) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.deleteRecord(event);
        },
        reject: () => {
        }
    });
}
  public submit(): void {
    setTimeout(() => {
      this.isCapchaPopulated = false;
    }, 5000);
    this.profileFormPhoneNumber = this.profileForm.get('phoneNo')?.value;
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

    this.profileForm.markAllAsTouched();
    if (!this.profileForm.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Form is not Valid',
        detail: 'Please Enter Valid Response',
      });
    }
    if (this.profileForm.valid) {
      this.displayModal = true;
    }
  }
  public showFormControlInvalid(formContols: AbstractControl): boolean {
    return formContols.invalid && (formContols.dirty || formContols.touched);
  }
  public addColumn(): void {
    this.memberForm.markAllAsTouched();
    if (!this.memberForm.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Form is not Valid',
        detail: 'Please Enter Valid Response',
      });
    }
    if (this.memberForm.valid) {
      const memberObject = {
        firstName: this.memberForm.get('firstName')?.value,
        lastName: this.memberForm.get('lastName')?.value,
        email: this.memberForm.get('email')?.value,
        phoneNo: this.memberForm.get('phoneNo')?.value,
        idNo: this.memberForm.get('idNo')?.value,
        idProof: this.memberForm.get('idProof')?.value,
        gender: this.memberForm.get('gender')?.value,
        dose: this.memberForm.get('dose')?.value,
        yob: this.memberForm.get('yob')?.value,
        previousVaccineType: this.memberForm.get('previousVaccineType')?.value,
        registeredInCowin: this.memberForm.get('registeredInCowin')?.value,
        beneficiaryReferenceId: this.memberForm.get('beneficiaryReferenceId')
          ?.value,
      };
      this.getMemberDataService.addRecord(memberObject);
      if (this.totalMembers === 0) {
        this.firstName1 = this.allMemberDetailsData[0]?.firstName;
        this.lastName1 = this.allMemberDetailsData[0]?.lastName;
        this.phoneNo1 = this.allMemberDetailsData[0]?.phoneNo;
      }
      if (this.totalMembers === 1) {
        this.firstName2 = this.allMemberDetailsData[1]?.firstName;
        this.lastName2 = this.allMemberDetailsData[1]?.lastName;
        this.phoneNo2 = this.allMemberDetailsData[1]?.phoneNo;
      }
      if (this.totalMembers === 2) {
        this.firstName3 = this.allMemberDetailsData[2]?.firstName;
        this.lastName3 = this.allMemberDetailsData[2]?.lastName;
        this.phoneNo3 = this.allMemberDetailsData[2]?.phoneNo;
      }
      if (this.totalMembers === 3) {
        this.firstName4 = this.allMemberDetailsData[3]?.firstName;
        this.lastName4 = this.allMemberDetailsData[3]?.lastName;
        this.phoneNo4 = this.allMemberDetailsData[3]?.phoneNo;
      }
      if (this.totalMembers === 4) {
        this.firstName5 = this.allMemberDetailsData[4]?.firstName;
        this.lastName5 = this.allMemberDetailsData[4]?.lastName;
        this.phoneNo5 = this.allMemberDetailsData[4]?.phoneNo;
      }
      this.visibleSidebar2 = false;
      this.showColumn[this.totalMembers + 1] = true;
      this.totalMembers = this.totalMembers + 1;
      const initialMemberObject = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: null,
        idNo: '',
        idProof: '',
        gender: 'Male',
        dose: 'First',
        yob: null,
        previousVaccineType: 'Covaxin',
        registeredInCowin: false,
        beneficiaryReferenceId: null,
      };
      this.messageService.add({
        severity: 'success',
        summary: 'Record Added',
        detail: 'Record added successfully',
      });
      this.memberForm.reset(initialMemberObject);

      if (this.totalMembers >= 5) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warn',
          detail: 'Maximum limit of adding people has been reached',
        });
      }
    }
  }

  public enableSendOTP(){
    this.toggleOTPVisibility = false;
    this.isCapchaPresent= true;
    this.registrationForm.reset();

  }
  public sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public deleteRecord(event: any): void {
    this.getMemberDataService.deleteRecord(event);
    this.allMemberDetailsData = this.getMemberDataService.x;

    this.updateRecord();
    this.showColumn[this.totalMembers] = false;
    this.totalMembers = this.totalMembers - 1;
    this.messageService.add({
      severity: 'error',
      summary: 'Record Deleted',
      detail: 'Record Deleted Successfully',
    });
  }

  public deleteFirstRecord(): void {
    this.showColumn[0] = false;
    this.profileForm.get('dose')?.setValue('None');
    this.messageService.add({
      severity: 'error',
      summary: 'Record Deleted',
      detail: 'Record Deleted Successfully',
    });
  }
  public updateRecord(): void {
    const temp = this.getMemberDataService.x;
    this.firstName1 = temp[0]?.firstName;
    this.lastName1 = temp[0]?.lastName;
    this.phoneNo1 = temp[0]?.phoneNo;
    this.firstName2 = temp[1]?.firstName;
    this.lastName2 = temp[1]?.lastName;
    this.phoneNo2 = temp[1]?.phoneNo;
    this.firstName3 = temp[2]?.firstName;
    this.lastName3 = temp[2]?.lastName;
    this.phoneNo3 = temp[2]?.phoneNo;
    this.firstName4 = temp[3]?.firstName;
    this.lastName4 = temp[3]?.lastName;
    this.phoneNo4 = temp[3]?.phoneNo;
    this.firstName5 = temp[4]?.firstName;
    this.lastName5 = temp[4]?.lastName;
    this.phoneNo5 = temp[4]?.phoneNo;
  }

  public editRecord(event: number): void {
    const editObject = this.getMemberDataService.x[event - 1];

    this.updateForm.reset(editObject);
    this.visibleSidebar3 = true;
    this.editIndex = event;
  }
  public updateRow(): void {
    if (this.updateForm.valid) {
      const memberObject = {
        firstName: this.updateForm.get('firstName')?.value,
        lastName: this.updateForm.get('lastName')?.value,
        email: this.updateForm.get('email')?.value,
        phoneNo: this.updateForm.get('phoneNo')?.value,
        idNo: this.updateForm.get('idNo')?.value,
        idProof: this.updateForm.get('idProof')?.value,
        gender: this.updateForm.get('gender')?.value,
        dose: this.updateForm.get('dose')?.value,
        yob: this.updateForm.get('yob')?.value,
        previousVaccineType: this.updateForm.get('previousVaccineType')?.value,
        registeredInCowin: this.updateForm.get('registeredInCowin')?.value,
        beneficiaryReferenceId: this.updateForm.get('beneficiaryReferenceId')
          ?.value,
      };
      this.getMemberDataService.updateRecord(this.editIndex, memberObject);
      const temp = this.getMemberDataService.x;
      this.firstName1 = temp[0]?.firstName;
      this.lastName1 = temp[0]?.lastName;
      this.phoneNo1 = temp[0]?.phoneNo;
      this.firstName2 = temp[1]?.firstName;
      this.lastName2 = temp[1]?.lastName;
      this.phoneNo2 = temp[1]?.phoneNo;
      this.firstName3 = temp[2]?.firstName;
      this.lastName3 = temp[2]?.lastName;
      this.phoneNo3 = temp[2]?.phoneNo;
      this.firstName4 = temp[3]?.firstName;
      this.lastName4 = temp[3]?.lastName;
      this.phoneNo4 = temp[3]?.phoneNo;
      this.firstName5 = temp[4]?.firstName;
      this.lastName5 = temp[4]?.lastName;
      this.phoneNo5 = temp[4]?.phoneNo;
      this.visibleSidebar3 = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Record Updated',
        detail: 'Record Updated successfully',
      });
    }
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
