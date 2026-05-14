import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChatResponse, Conversation, Message } from '../interfaces/chat.interface';
import { AuthService } from '../../auth/services/auth.service';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private getHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
  }

  private handleError<T>() {
    return catchError<T, Observable<never>>((error: any) => {
      this.authService.handleAuthError(error, '/auth/login');
      return throwError(() => error);
    });
  }

  sendMessage(message: string, conversationId: number | null): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${baseUrl}/chat/message`, {
      message: message,
      conversationId: conversationId
    }, this.getHeaders()).pipe(this.handleError());
  }

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${baseUrl}/chat/conversations`, this.getHeaders()).pipe(this.handleError());
  }

  getMessages(id: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${baseUrl}/chat/conversations/${id}/messages`, this.getHeaders()).pipe(this.handleError());
  }

  deleteConversation(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/chat/conversations/${id}`, this.getHeaders()).pipe(this.handleError());
  }

  renameConversation(id: number, title: string): Observable<any> {
    return this.http.patch(`${baseUrl}/chat/conversations/${id}`, { title }, this.getHeaders()).pipe(this.handleError());
  }
}
