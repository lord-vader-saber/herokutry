import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JwtTokenSenderService {
  public $urlStart = 'http://ec2-3-142-186-165.us-east-2.compute.amazonaws.com:8080/';
  public jwtToken: any;
  public auth_token = localStorage.getItem('token');
  constructor(private http: HttpClient) {}
  public sendPhoneNo(data: any): Observable<any>{
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',

    });
    return this.http.post(this.$urlStart + 'isregistered', data, {
      headers: header,
      responseType: 'text',
    });
  }
  public sendJwtToken(data: any): Observable<any> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',

    });
    return this.http.post(this.$urlStart + 'authenticate', data, {
      headers: header,
      responseType: 'text',
    });
  }
}
