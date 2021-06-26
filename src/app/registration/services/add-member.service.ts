import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddMemberService {
  public $urlStart =
    'http://ec2-3-142-186-165.us-east-2.compute.amazonaws.com:8080/';
  public auth_token = localStorage.getItem('token');
  constructor(private http: HttpClient) {}

  public addMemberDetails(data: any): Observable<any> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      Authorization: `Bearer ${this.auth_token}`,
    });
    return this.http.post(
      this.$urlStart + 'vaccination/saveMemberDetails',
      data,
      {
        headers: header,
        responseType: 'text',
      }
    );
  }
}
