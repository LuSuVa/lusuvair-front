import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  login(body: { email: string; password: string }) {
    const subscription = this.http
      .post(`${this.url}/login`, body)
      .subscribe((value) => {
        console.log(value);
      });
  }
}
