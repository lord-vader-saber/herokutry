import { UpdateMemberDetails } from './../model/member-detail.model';

import { Injectable } from '@angular/core';
import { GetUserDetailsViaJwtService } from './get-user-details-via-jwt.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateMemberFormService {
  constructor(
    private getUserDetailsViaJwtService: GetUserDetailsViaJwtService
  ) {}

  public getMemberUpdateFormDetails(index: number): UpdateMemberDetails {
    return this.getUserDetailsViaJwtService.memberArray[index];
  }
}
