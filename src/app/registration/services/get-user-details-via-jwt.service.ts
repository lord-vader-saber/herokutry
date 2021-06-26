import { MemberDetails, UpdateMember } from 'src/app/registration/model/member-detail.model';
import { PrimaryUser, UpdateMemberDetails } from './../model/member-detail.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SaveUserDetails } from '../model/member-detail.model';
import { JwtTokenSenderService } from './jwt-token-sender.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GetUserDetailsViaJwtService {
  // get user details via jwt service
  public primaryUserData!: PrimaryUser;
  public memberUserData!: MemberDetails;
  public memberArray: UpdateMemberDetails [] = [];
  public $urlStart =
    'http://ec2-3-142-186-165.us-east-2.compute.amazonaws.com:8080/';
  public auth_token = localStorage.getItem('token');

  constructor(
    private http: HttpClient,
    private jwtTokenSenderService: JwtTokenSenderService
  ) {
    
  }
  public getUserDetails() {
    if (this.auth_token == null) {
      const firebaseTOken = localStorage.getItem('Firebase Token');
      this.jwtTokenSenderService.sendJwtToken(firebaseTOken);
    }
   
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE, PUT, HEAD',
      Authorization: `Bearer ${this.auth_token}`,
    });

    const apiURL = this.$urlStart + 'vaccination/getUserDetails';
    return this.http
      .get<SaveUserDetails>(apiURL, {
        headers: header,
      })
      .pipe(
        map((data) => {
          this.primaryUserData = {
            firstName: data.primaryUser.firstName,
            lastName: data.primaryUser.lastName,
            email: data.primaryUser.email,
            phoneNo: data.primaryUser.phoneNo,
            gender: data.primaryUser.gender,
            dose: data.primaryUser.dose,
            location: data.primaryUser.location,
            idNo: data.primaryUser.idNo,
            idProof: data.primaryUser.idProof,
            previousVaccineType: data.primaryUser.previousVaccineType,
            registeredInCowin: data.primaryUser.registeredInCowin,
            beneficiaryReferenceId: data.primaryUser.beneficiaryReferenceId,
            yob: data.primaryUser.yob,

          };
          for(let i =0; i< data.members.length; i++){
            this.memberArray[i]= data.members[i];
          }
        })
      );
  }

  public deleteUserDetails(index:number){
    this.memberArray.splice(index-1,1);
  }

  public addMemberDetails( data1: UpdateMember){
    this.memberArray.push(data1);
  }
}
