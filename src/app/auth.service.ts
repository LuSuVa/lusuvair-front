import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080/user';
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    this.checkLoginStatus();
  }

  private checkLoginStatus() {
    const token = this.getAuthToken();
    const isUserLoggedIn = token !== null
    this.loggedIn.next(isUserLoggedIn);
  }

  getAuthToken(): string {
    return localStorage.getItem('jwt-token') || '';
  }

  setAuthToken(token: string) {
    localStorage.setItem('jwt-token', token);
  }

  getAuthRole(): string[] {
    const role = localStorage.getItem('role')
    return role ? JSON.parse(role) : []
  }

  setAuthRole(role: string[] |string) {
    if (typeof role === 'string'){
      role = role.split(',')
    }
    localStorage.setItem('role', JSON.stringify(role));
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
          console.log(value.role);

          this.setAuthToken(value.token);
        }
        console.log(value)
        if(value.role){
          this.setAuthRole(value.role)
        }

      })
    );
  }
}
