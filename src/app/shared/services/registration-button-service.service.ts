import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegistrationButtonServiceService {
  public isVIsible = true;
  constructor() {}
  public getButtonVisibility(): boolean {
    return this.isVIsible;
  }
  public setButtonVisibility(event: boolean): void{
    this.isVIsible = event;
  }
}
