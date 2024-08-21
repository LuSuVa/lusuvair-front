import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private url = 'http://localhost:8080/messages';

  constructor(private http: HttpClient) {}


  // setMessage(message: string){

  // }

  sendMessage(body: { id: number, message: string }) {
    return this.http.post(`${this.url}`, body).pipe(
      tap((value: any) => {
        console.log('Message envoyé:', value);
      })
    );
  }

  like(id: number) {
    return this.http.post(`${this.url}/${id}/like`, {}).pipe(
      tap((value: any) => {
        console.log('Like envoyé:', value.isLike);
      })
    );
  }
}
