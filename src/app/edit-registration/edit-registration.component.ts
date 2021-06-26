import { GetUserDetailsViaJwtService } from './../registration/services/get-user-details-via-jwt.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import {
  MemberDetails,
  PrimaryUser,
  UpdateMember,
} from '../registration/model/member-detail.model';
import { RegistrationButtonServiceService } from '../shared/services/registration-button-service.service';
import { EditMembersService } from './shared/services/edit-members.service';
import { UpdateMemberFormService } from '../registration/services/update-member-form.service';
import { UpdateMemberService } from '../registration/services/update-member.service';
import { UpdateEditRegistrationMemberRecordService } from '../registration/services/update-edit-registration-member-record.service';
import { DeleteEditRegistrationMemberService } from '../registration/services/delete-member.service';
import { AddMemberService } from '../registration/services/add-member.service';

@Component({
  selector: 'app-edit-registration',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.scss'],
  providers: [MessageService, EditMembersService, ConfirmationService],
})
export class EditRegistrationComponent implements OnInit, DoCheck {
  [key: string]: any;

  public primaryMemberIdProof!: string | undefined;
  public idProof: SelectItem[];
  public s!: UpdateMember;
  public visibleSidebar2 = false;
  public previousVaccineTypeOptions: SelectItem[];
  public backupTypeDropdownOptions: SelectItem[];
  public totalMembers = 0;
  public editIndex = 0;
  public showColumn: boolean[] = [true, true, true, true, true, false];
  public firstName1 = '';
  public lastName1 = '';
  public mobileNumber1 = '';
  public firstName2 = '';
  public lastName2 = '';
  public mobileNumber2 = '';
  public firstName3 = '';
  public lastName3 = '';
  public mobileNumber3 = '';
  public firstName4 = '';
  public lastName4 = '';
  public mobileNumber4 = '';
  public firstName5 = '';
  public lastName5 = '';
  public mobileNumber5 = '';
  public visibleSidebar3 = false;
  public allMemberDetailsData: MemberDetails[] = [];
  public totalMemberNumber!: number;

  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public idNo!: string | undefined;
  public phoneNo!: string;
  public yob!: number;
  public previousVaccineType!: string | undefined;
  public gender = 'Male';
  public dose = 'First';
  public location!: string;
  public registeredInCowin = false;
  public beneficiaryReferenceId!: string | undefined;

  public editedProfileData!: PrimaryUser;

  editedMemberForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.min(1000000000),
      Validators.max(9999999999),
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

  updateEditedMemberForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.min(1000000000),
      Validators.max(9999999999),
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
    id: new FormControl(''),
    memberId: new FormControl(''),
  });

  public showFormControlInvalid(formContols: AbstractControl): boolean {
    return formContols.invalid && (formContols.dirty || formContols.touched);
  }

  public setMemberFormValidator(b: string) {
    if (b === 'Yes') {
      this.editedMemberForm
        .get('beneficiaryReferenceId')
        ?.setValidators([Validators.required]);
      this.editedMemberForm
        .get('beneficiaryReferenceId')
        ?.updateValueAndValidity();
    }
    if (b === 'No') {
      this.editedMemberForm.get('beneficiaryReferenceId')?.clearValidators();
      this.editedMemberForm
        .get('beneficiaryReferenceId')
        ?.updateValueAndValidity();
    }
  }

  public setUpdatedEditedMemberFormValidator(b: string) {
    if (b === 'Yes') {
      this.updateEditedMemberForm
        .get('beneficiaryReferenceId')
        ?.setValidators([Validators.required]);
      this.updateEditedMemberForm
        .get('beneficiaryReferenceId')
        ?.updateValueAndValidity();
    }
    if (b === 'No') {
      this.updateEditedMemberForm
        .get('beneficiaryReferenceId')
        ?.clearValidators();
      this.updateEditedMemberForm
        .get('beneficiaryReferenceId')
        ?.updateValueAndValidity();
    }
  }
  constructor(
    private messageService: MessageService,
    private getMemberDataService: EditMembersService,
    private registrationButtonServiceService: RegistrationButtonServiceService,
    private getUserDetailsViaJwtService: GetUserDetailsViaJwtService,
    private updateMemberFormService: UpdateMemberFormService,
    private updateMemeberService: UpdateMemberService,
    private updateEditRegistrationMemberRecordService: UpdateEditRegistrationMemberRecordService,
    private deleteEditRegistrationMemberService: DeleteEditRegistrationMemberService,
    private addMemberService: AddMemberService,
    private confirmationService: ConfirmationService
  ) {
    this.previousVaccineTypeOptions = [
      { label: 'Covaxin', value: 'Covaxin' },
      { label: 'Covishield', value: 'Covishield' },
      { label: 'Sputnik V', value: 'Sputnik V' },
      { label: 'Pfizer', value: 'Pfizer' },
      { label: 'Other', value: 'Other' },
    ];
    this.backupTypeDropdownOptions = [
      { label: 'Hyderabad', value: 'Hyderabad' },
      { label: 'Bangalore', value: 'Bangalore' },
      { label: 'Chennai', value: 'Chennai' },
      { label: 'Pune', value: 'Pune' },
      { label: 'Vishakhapatnam', value: 'Vishakhapatnam' },
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
    this.registrationButtonServiceService.setButtonVisibility(false);

    this.editedProfileData = this.getUserDetailsViaJwtService.primaryUserData;
    this.firstName = this.editedProfileData?.firstName;
    this.lastName = this.editedProfileData?.lastName;
    this.email = this.editedProfileData?.email;
    this.phoneNo = this.editedProfileData?.phoneNo.toString();
    this.gender = this.editedProfileData?.gender;
    this.dose = this.editedProfileData?.dose;
    this.yob = this.editedProfileData?.yob;
    this.previousVaccineType = this.editedProfileData?.previousVaccineType;
    this.registeredInCowin = this.editedProfileData?.registeredInCowin;
    this.beneficiaryReferenceId =
      this.editedProfileData?.beneficiaryReferenceId;
    this.location = this.editedProfileData?.location;
    this.idNo = this.editedProfileData?.idNo;
    this.primaryMemberIdProof = this.editedProfileData?.idProof;
    this.totalMembers = this.getUserDetailsViaJwtService.memberArray.length;
    this.firstName1 =
      this.getUserDetailsViaJwtService.memberArray[0]?.firstName;
    this.lastName1 = this.getUserDetailsViaJwtService.memberArray[0]?.lastName;
    this.mobileNumber1 =
      this.getUserDetailsViaJwtService.memberArray[0]?.phoneNo;
    this.firstName2 =
      this.getUserDetailsViaJwtService.memberArray[1]?.firstName;
    this.lastName2 = this.getUserDetailsViaJwtService.memberArray[1]?.lastName;
    this.mobileNumber2 =
      this.getUserDetailsViaJwtService.memberArray[1]?.phoneNo;
    this.firstName3 =
      this.getUserDetailsViaJwtService.memberArray[2]?.firstName;
    this.lastName3 = this.getUserDetailsViaJwtService.memberArray[2]?.lastName;
    this.mobileNumber3 =
      this.getUserDetailsViaJwtService.memberArray[2]?.phoneNo;
    this.firstName4 =
      this.getUserDetailsViaJwtService.memberArray[3]?.firstName;
    this.lastName4 = this.getUserDetailsViaJwtService.memberArray[3]?.lastName;
    this.mobileNumber4 =
      this.getUserDetailsViaJwtService.memberArray[3]?.phoneNo;
    this.firstName5 =
      this.getUserDetailsViaJwtService.memberArray[4]?.firstName;
    this.lastName5 = this.getUserDetailsViaJwtService.memberArray[4]?.lastName;
    this.mobileNumber5 =
      this.getUserDetailsViaJwtService.memberArray[4]?.phoneNo;
  }

  ngOnInit(): void {
    this.allMemberDetailsData = this.getMemberDataService.membersData;

    this.getUserDetailsViaJwtService.getUserDetails().subscribe((data) => {});
  }

  public confirm2(event: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteRecord(event);
      },
      reject: () => {},
    });
  }
  public deleteRecord(event: any): void {
    let deleteObject = {
      id: this.getUserDetailsViaJwtService.memberArray[event - 1]?.id,
      memberId:
        this.getUserDetailsViaJwtService.memberArray[event - 1]?.memberId,
    };

    this.deleteEditRegistrationMemberService
      .deleteMemberDetails(deleteObject)
      .subscribe((result) => {});

    this.getUserDetailsViaJwtService.deleteUserDetails(event);

    this.messageService.add({
      severity: 'error',
      summary: 'Record Deleted',
      detail: 'Record Deleted Successfully',
    });
  }

  public deleteFirstRecord(): void {
    this.showColumn[0] = false;
    this.messageService.add({
      severity: 'error',
      summary: 'Record Deleted',
      detail: 'Record Deleted Successfully',
    });
  }
  public editRecord(event: number): void {
    this.s = this.updateMemberFormService.getMemberUpdateFormDetails(event - 1);
    this.updateEditedMemberForm.get('firstName')?.setValue(this.s.firstName);
    this.updateEditedMemberForm.get('lastName')?.setValue(this.s.lastName);
    this.updateEditedMemberForm.get('email')?.setValue(this.s.email);
    this.updateEditedMemberForm.get('gender')?.setValue(this.s.gender);
    this.updateEditedMemberForm.get('idNo')?.setValue(this.s.idNo);
    this.updateEditedMemberForm.get('idProof')?.setValue(this.s.idProof);
    this.updateEditedMemberForm.get('phoneNo')?.setValue(this.s.phoneNo);
    this.updateEditedMemberForm
      .get('previousVaccineType')
      ?.setValue(this.s.previousVaccineType);
    this.updateEditedMemberForm.get('yob')?.setValue(this.s.yob);
    this.updateEditedMemberForm
      .get('registeredInCowin')
      ?.setValue(this.s.registeredInCowin);
    this.updateEditedMemberForm
      .get('beneficiaryReferenceId')
      ?.setValue(this.s.beneficiaryReferenceId);
    this.updateEditedMemberForm.get('id')?.setValue(this.s.id);
    this.updateEditedMemberForm.get('memberId')?.setValue(this.s.memberId);
    this.visibleSidebar3 = true;
    this.editIndex = event;
  }
  public updateRow(): void {
    if (this.updateEditedMemberForm.valid) {
      const memberObject = {
        firstName: this.updateEditedMemberForm.get('firstName')?.value,
        lastName: this.updateEditedMemberForm.get('lastName')?.value,
        email: this.updateEditedMemberForm.get('email')?.value,
        phoneNo: this.updateEditedMemberForm.get('phoneNo')?.value,
        idNo: this.updateEditedMemberForm.get('idNo')?.value,
        idProof: this.updateEditedMemberForm.get('idProof')?.value,
        gender: this.updateEditedMemberForm.get('gender')?.value,
        dose: this.updateEditedMemberForm.get('dose')?.value,
        yob: this.updateEditedMemberForm.get('yob')?.value,
        earlierVaccType: this.updateEditedMemberForm.get('previousVaccineType')
          ?.value,
        registeredInCowin:
          this.updateEditedMemberForm.get('registeredInCowin')?.value,
        beneficiaryRefId: this.updateEditedMemberForm.get(
          'beneficiaryReferenceId'
        )?.value,
        id: this.updateEditedMemberForm.get('id')?.value,
        memberId: this.updateEditedMemberForm.get('memberId')?.value,
      };
      this.updateMemeberService
        .sendUpdatedMemberDetails(memberObject)
        .subscribe(() => {
          this.getUserDetailsViaJwtService.memberArray[
            this.editIndex - 1
          ].firstName = this.updateEditedMemberForm.get('firstName')!.value;
          this.getUserDetailsViaJwtService.memberArray[
            this.editIndex - 1
          ].lastName = this.updateEditedMemberForm.get('lastName')!.value;
          this.getUserDetailsViaJwtService.memberArray[
            this.editIndex - 1
          ].email = this.updateEditedMemberForm.get('email')!.value;
          this.getUserDetailsViaJwtService.memberArray[
            this.editIndex - 1
          ].phoneNo = this.updateEditedMemberForm.get('phoneNo')!.value;
          this.getUserDetailsViaJwtService.memberArray[
            this.editIndex - 1
          ].gender = this.updateEditedMemberForm.get('gender')!.value;
          this.getUserDetailsViaJwtService.memberArray[this.editIndex - 1].id =
            this.updateEditedMemberForm.get('id')!.value;
          this.getUserDetailsViaJwtService.memberArray[
            this.editIndex - 1
          ].idProof = this.updateEditedMemberForm.get('idProof')!.value;
          this.getUserDetailsViaJwtService.memberArray[
            this.editIndex - 1
          ].earlierVaccType = this.updateEditedMemberForm.get(
            'previousVaccineType'
          )!.value;
          this.getUserDetailsViaJwtService.memberArray[
            this.editIndex - 1
          ].dose = this.updateEditedMemberForm.get('dose')!.value;
          this.getUserDetailsViaJwtService.memberArray[this.editIndex - 1].yob =
            this.updateEditedMemberForm.get('yob')!.value;
          this.getUserDetailsViaJwtService.memberArray[
            this.editIndex - 1
          ].registeredInCowin =
            this.updateEditedMemberForm.get('registeredInCowin')!.value;
          this.getUserDetailsViaJwtService.memberArray[
            this.editIndex - 1
          ].beneficiaryRefId = this.updateEditedMemberForm.get(
            'beneficiaryReferenceId'
          )!.value;
          this.updateEditRegistrationMemberRecordService.updateRecord(
            this.editIndex,
            memberObject
          );
          this.visibleSidebar3 = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Record Updated',
            detail: 'Record Updated successfully',
          });
        });
    }
    if (!this.updateEditedMemberForm.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Record Not Updated',
        detail: 'Please enter all valid fields',
      });
    }
  }

  public addMemberRecord() {
    this.editedMemberForm.markAllAsTouched();
    if (this.editedMemberForm.valid) {
      this.addMemberService
        .addMemberDetails(this.editedMemberForm.value)
        .subscribe(
          (result) => {
            this.getUserDetailsViaJwtService.addMemberDetails(
              this.editedMemberForm.value
            );
            this.showColumn[this.totalMembers] = true;
            this.visibleSidebar2 = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Member Added',
              detail: 'User is successfully added',
            });
            if (this.totalMembers === 4) {
              this.messageService.add({
                severity: 'warn',
                summary: 'Limit exceeded',
                detail: 'Maximum 5 members can be added',
              });
            }
            let editedFormObject = {
              firstName: '',
              lastName: '',
              email: '',
              phoneNo: '',
              idNo: '',
              idProof: '',
              gender: 'Male',
              dose: 'First',
              yob: null,
              previousVaccineType: '',
              registeredInCowin: false,
              beneficiaryReferenceId: '',
            };
            this.editedMemberForm.reset(editedFormObject);
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Member Cannot be added',
              detail: 'User cannot be added',
            });
          }
        );
    }

    if (!this.editedMemberForm.valid) {
      this.messageService.add({
        severity: 'error',
        id: 'edit-registration-update-invalid',
        summary: 'Form is not Valid',
        detail: 'Please Enter Valid Response',
      });
    }
  }
}
