import { User } from "./user.interface";

export interface AuthResponse {
  mensaje: string;
  token: string;
  usuario: User;
}
