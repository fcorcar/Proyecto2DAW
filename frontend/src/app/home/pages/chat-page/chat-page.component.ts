import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterLink } from "@angular/router";
import { FormsModule, NgModel } from '@angular/forms';
import { NgClass } from '@angular/common';

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

  // Datos interfaz de usuario
  isAdmin = signal(this.authService.user()?.rol === 'admin');
  userName = signal(this.authService.user()?.name);



  // Datos simulados
  conversations = signal<Conversation[]>([
    { id: 1, title: 'Optimización de luces salón con cosas grandes' },
    { id: 2, title: 'Configuración de seguridad' },
    { id: 3, title: 'Rutina de mañana' }
  ]);

  messages = signal<Message[]>([
    { text: 'Hola, ¿en qué puedo ayudarte hoy?', sender: 'ia' },
    { text: '¿Puedes revisar el consumo energético?', sender: 'user' }
  ]);

  newMessage = signal('');
  activeConversationId = signal(1);
  menuOpenId = signal<number | null>(null); // Para el menu de 3 puntitos


  // METODOS
  sendMessage() {
    if (!this.newMessage().trim()) return;
    this.messages.update(prev => [...prev, { text: this.newMessage(), sender: 'user' }]);
    this.newMessage.set('');
    // TODO: Disparo de resp IA
  }

  toggleMenu(id: number, event: Event) {
    event.stopPropagation();
    this.menuOpenId.set(this.menuOpenId() === id ? null : id);
  }

  renameConversation(id: number) {
    console.log('Renombrando...', id);
    this.menuOpenId.set(null);
  }

  deleteConversation(id: number) {
    this.conversations.update(list => list.filter(c => c.id !== id));
    this.menuOpenId.set(null);
  }

  logout() {
    this.authService.logout();
  }
}


