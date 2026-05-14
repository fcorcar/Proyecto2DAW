import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;

export interface ChatResponse {
  conversationId: number;
  response: string;
}

export interface Conversation {
  id: number;
  title: string;
}

export interface Message {
  text: string;
  sender: 'usuario' | 'ia';
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);

  private getHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
  }

  sendMessage(message: string, conversationId: number | null): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${baseUrl}/chat/message`, {
      message: message,
      conversationId: conversationId
    }, this.getHeaders());
  }

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${baseUrl}/chat/conversations`, this.getHeaders());
  }

  getMessages(id: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${baseUrl}/chat/conversations/${id}/messages`, this.getHeaders());
  }

  deleteConversation(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/chat/conversations/${id}`, this.getHeaders());
  }

  renameConversation(id: number, title: string): Observable<any> {
    return this.http.patch(`${baseUrl}/chat/conversations/${id}`, { title }, this.getHeaders());
  }
}
