import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = 'test';
  password = 'test';

  constructor() {
  }

  public logIn(user: string, password: string) {
    localStorage.setItem('access_token', this.getToken(user, password));
  }

  public logOut() {
    localStorage.removeItem('access_token');
  }

  public getToken(user: string, password: string): string {
    if (user === this.user && password === this.password) {
      return user + password;
    }
  }
}
