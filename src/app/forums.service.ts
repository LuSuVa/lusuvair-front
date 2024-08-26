import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumsService {

  private url = 'http://localhost:8080/sections';

  constructor(private http: HttpClient) {}

  sendNewSubject(body:{title: string, content:string}){
    return this.http.post(`${this.url}`,body).pipe(
      tap((value: any)=>{
        console.log(value);
      })
    )
  }

  getSubject(): Observable<{title:string, content:string}[]>{
    return this.http.get<{title:string, content:string}[]>(`${this.url}`)
  }
}
