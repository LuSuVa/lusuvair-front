import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Message } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = 'http://localhost:8080/messages';

  constructor(private http: HttpClient) {}

  sendMessage(body: { sectionId: number, content: string }) {
    return this.http.post<Message>(`${this.url}`, body);
  }

  like(id: number) {
    return this.http.post(`${this.url}/${id}/like`, {}).pipe(
      tap((value: any) => {
        console.log('Like envoyé:', value.isLiked);
      })
    );
  }

  getLike(id:number){
    return this.http.get(`${this.url}/${id}/like`)
  }

  dislike(id: number) {
    return this.http.post(`${this.url}/${id}/dislike`, {}).pipe(
      tap((value: any) => {
        console.log('Like envoyé:', value.isDisliked);
      })
    );
  }
}
