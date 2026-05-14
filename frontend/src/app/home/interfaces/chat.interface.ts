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
