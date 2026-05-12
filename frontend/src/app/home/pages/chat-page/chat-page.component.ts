import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterLink } from "@angular/router";
import { FormsModule, NgModel } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ChatService } from '../../services/chat.service';

interface Conversation {
  id: number;
  title: string;
}

interface Message {
  text: string;
  sender: 'user' | 'ia';
}

@Component({
  imports: [FormsModule, NgClass, RouterLink],
  templateUrl: './chat-page.component.html',
})
export class ChatPageComponent {
  authService = inject(AuthService);
  chatService = inject(ChatService);

  // Datos interfaz de usuario
  isAdmin = signal(this.authService.user()?.rol === 'admin');
  userName = signal(this.authService.user()?.name);

  // Etiquetas HTML
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @ViewChild('chatInput') private chatInput!: ElementRef<HTMLInputElement>;

  //! Datos simulados
  conversations = signal<Conversation[]>([
    { id: 1, title: 'Optimización de luces salón con cosas grandes' },
    { id: 2, title: 'Configuración de seguridad' },
    { id: 3, title: 'Rutina de mañana' }
  ]);

  // Mensajes
  messages = signal<Message[]>([]);
  newMessage = signal('');
  activeConversationId = signal<number | null>(null);
  isLoading = signal(false);

  //! Menu lateral
  menuOpenId = signal<number | null>(null);


  // METODOS
  startNewConversation() {
    this.activeConversationId.set(null);
    this.messages.set([]);
    this.newMessage.set('');
    this.focusInput();
  }

  sendMessage() {
    const promptText = this.newMessage().trim();
    if (!promptText || this.isLoading()) return;

    // Añadimos el mensaje del usuario a la pantalla
    this.messages.update(prev => [...prev, { text: promptText, sender: 'user' }]);
    this.newMessage.set('');
    this.isLoading.set(true);

    this.scrollToBottom();

    // Peticion a la API
    this.chatService.sendMessage(promptText, this.activeConversationId()).subscribe({
      next: (res) => {
        // Guardamos en el componente el id obtenido de bd
        this.activeConversationId.set(res.conversationId);

        // Añadimos el mensaje de respuesta de la IA
        this.messages.update(prev => [...prev, { text: res.response, sender: 'ia' }]);
        this.isLoading.set(false);

        this.scrollToBottom();
        this.focusInput();
      },
      error: (err) => {
        console.error('Error al comunicar con la API:', err);

        // Borramos el ultimo mensaje
        this.messages.update(prev => prev.slice(0, -1));

        // Seteamos el mensaje al input
        this.newMessage.set(promptText);
        this.isLoading.set(false);

        this.focusInput();
      }
    });
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    }, 50);
  }

  private focusInput() {
    setTimeout(() => {
      if (this.chatInput) {
        this.chatInput.nativeElement.focus();
      }
    }, 50);
  }

  //!
  toggleMenu(id: number, event: Event) {
    event.stopPropagation();
    this.menuOpenId.set(this.menuOpenId() === id ? null : id);
  }

  //!
  renameConversation(id: number) {
    console.log('Renombrando...', id);
    this.menuOpenId.set(null);
  }

  //!
  deleteConversation(id: number) {
    this.conversations.update(list => list.filter(c => c.id !== id));
    this.menuOpenId.set(null);
  }

  logout() {
    this.authService.logout();
  }
}


