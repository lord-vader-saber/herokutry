import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaveUserDetails } from '../model/member-detail.model';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  public $urlStart =
    'http://ec2-3-142-186-165.us-east-2.compute.amazonaws.com:8080/';

  constructor(private http: HttpClient) {}
  public sendSaveUserDetailsData(data: SaveUserDetails) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    });
    return this.http
      .post(this.$urlStart + 'vaccination/saveUserDetails', data, {
        headers: header,
        responseType: 'text',
      });
  }
}
