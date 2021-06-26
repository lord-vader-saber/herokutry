import { MemberDetails } from './../model/member-detail.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetmemberdataService {
  public x: MemberDetails[] = [];
  constructor() {}

  public addRecord(data: MemberDetails): void {
    this.x.push(data);
  }

  public deleteRecord(index: number): MemberDetails[] {
    this.x.splice(index - 1, 1);
    return this.x;
  }

  public updateRecord(index: number, data: MemberDetails): void {
    this.x.splice(index - 1, 1);
    this.x.splice(index - 1, 0, data);

  }
}
