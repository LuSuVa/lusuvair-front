import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  getAuthToken(): string {
    return localStorage.getItem('jwt-token') || '';
  }

  setAuthToken(token: string) {
    localStorage.setItem('jwt-token', token);
  }

  register(body: {
    email: string;
    password: string;
    lastName: string;
    firstName: string;
  }) {
    return this.http.post(`${this.url}/register`, body).pipe(
      tap((value: any) => {
        if (value.token) {
          this.setAuthToken(value.token);
        }
      })
    );
  }

  login(body: { email: string; password: string }) {
    return this.http.post(`${this.url}/login`, body).pipe(
      tap((value: any) => {
        if (value.token) {
          this.setAuthToken(value.token);
        }
      })
    );
  }
}
