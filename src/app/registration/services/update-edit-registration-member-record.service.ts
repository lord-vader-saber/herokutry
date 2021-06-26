import { Injectable } from '@angular/core';
import { UpdateMember } from '../model/member-detail.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateEditRegistrationMemberRecordService {

  public editRegistrationMemberData: UpdateMember[] = [];

  constructor() { }
  public updateRecord(index: number, data: UpdateMember): void {
    this.editRegistrationMemberData.splice(index - 1, 1);
    this.editRegistrationMemberData.splice(index - 1, 0, data);
  }
}
