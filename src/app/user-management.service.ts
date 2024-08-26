import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
private url = 'http://localhost:8080/user'

  constructor(private http: HttpClient) { }

  getUser(){
    return this.http.get<User[]>(`${this.url}`).pipe(
      tap((value:any)=>{

      })
    )
  }

  suspendUser(userId: number, days:number) {
    return this.http.patch(`${this.url}/${userId}/suspend/${days}`, {}).pipe(
      tap((value: any) => {
        console.log('Message envoyé:', value);
      })
    );
  }
}
