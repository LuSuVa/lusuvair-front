import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Subject } from './user.model';

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

  getSubjects(): Observable<Subject[]>{
    return this.http.get<Subject[]>(`${this.url}`)
  }

  getSubjectById(id:number): Observable<Subject>{
    return this.http.get<Subject>(`${this.url}/${id}`)
  }
}
