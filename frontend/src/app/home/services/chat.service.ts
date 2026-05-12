import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;

export interface ChatResponse {
  conversationId: number;
  response: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);

  sendMessage(message: string, conversationId: number | null): Observable<ChatResponse> {
    const token = localStorage.getItem('token');

    return this.http.post<ChatResponse>(`${baseUrl}/chat/message`, {
      message: message,
      conversationId: conversationId
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
