import { AfterViewInit, Component, ElementRef, HostListener, inject, signal, ViewChild } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterLink } from "@angular/router";
import { FormsModule, NgModel } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { MarkdownComponent } from 'ngx-markdown';
import { Message } from '../../interfaces/chat.interface';


@Component({
  imports: [FormsModule, NgClass, RouterLink, MarkdownComponent],
  templateUrl: './chat-page.component.html',
})
export class ChatPageComponent implements AfterViewInit{
  authService = inject(AuthService);
  chatService = inject(ChatService);

  // Datos interfaz de usuario
  isAdmin = signal(this.authService.user()?.rol === 'admin');
  userName = signal(this.authService.user()?.name);

  // Etiquetas HTML
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @ViewChild('chatInput') private chatInput!: ElementRef<HTMLInputElement>;

  // Conversaciones
  conversationsResource = rxResource({
    loader: () => this.chatService.getConversations()
  });

  // Mensajes
  messages = signal<Message[]>([]);
  newMessage = signal('');
  activeConversationId = signal<number | null>(null);
  isLoading = signal(false);
  menuOpenId = signal<number | null>(null);


  // METODOS
  ngAfterViewInit(): void {
    this.focusInput();
  }

  startNewConversation() {
    this.activeConversationId.set(null);
    this.messages.set([]);
    this.newMessage.set('');
    this.focusInput();
  }

  loadConversation(id: number) {
    if (this.isLoading()) return;

    this.activeConversationId.set(id);
    this.isLoading.set(true);
    this.messages.set([]);

    this.chatService.getMessages(id).subscribe({
      next: (msgs) => {
        this.messages.set(msgs);
        this.isLoading.set(false);
        this.scrollToBottom();
        this.focusInput();
      },
      error: () => this.isLoading.set(false)
    });

  }

  sendMessage() {
    const promptText = this.newMessage().trim();
    if (!promptText || this.isLoading()) return;

    // Comprobamos que sea nueva conversacion
    const isFirstMessage = this.activeConversationId() === null;

    // Añadimos el mensaje del usuario a la pantalla
    this.messages.update(prev => [...prev, { text: promptText, sender: 'usuario' }]);
    this.newMessage.set('');
    this.isLoading.set(true);
    this.scrollToBottom();

    // Peticion a la API
    this.chatService.sendMessage(promptText, this.activeConversationId()).subscribe({
      next: (res) => {
        this.activeConversationId.set(res.conversationId);
        this.messages.update(prev => [...prev, { text: res.response, sender: 'ia' }]);
        this.isLoading.set(false);

        if (isFirstMessage) {
          this.conversationsResource.reload();
        }

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

  toggleMenu(id: number, event: Event) {
    event.stopPropagation();
    this.menuOpenId.set(this.menuOpenId() === id ? null : id);
  }

  @HostListener('document:click')
  onDocumentClick() {
    if (this.menuOpenId() !== null) {
      this.menuOpenId.set(null);
    }
  }

  renameConversation(id: number) {
    const newTitle = prompt("Introduce el nuevo título de la conversación:");
    if (!newTitle) return;

    this.chatService.renameConversation(id, newTitle).subscribe({
      next: () => this.conversationsResource.reload()
    });
    this.menuOpenId.set(null);
  }

  deleteConversation(id: number) {
    this.chatService.deleteConversation(id).subscribe({
      next: () => {
        this.conversationsResource.reload();
        if (this.activeConversationId() === id) {
          this.startNewConversation();
        }
      }
    });
    this.menuOpenId.set(null);
  }

  logout() {
    this.authService.logout();
  }
}
