import { Injectable } from '@angular/core';
import { MemberDetails } from 'src/app/registration/model/member-detail.model';

@Injectable({
  providedIn: 'root'
})
export class EditMembersService {

  public membersData: MemberDetails[] = [];
  constructor() {}

  public addRecord(data: MemberDetails): void {
    this.membersData.push(data);
  }

  public confirm2(index: number): MemberDetails[] {
    this.membersData.splice(index - 1, 1);
    return this.membersData;
  }

  public updateRecord(index: number, data: MemberDetails): void {
    this.membersData.splice(index - 1, 1);
    this.membersData.splice(index - 1, 0, data);
  }
}
