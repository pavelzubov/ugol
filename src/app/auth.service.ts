import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = 'test';
  password = 'test';
  page = '/calculate';

  constructor() {
  }

  public logIn(user: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const token = this.getToken(user, password);
      if (!token) {
        reject('Error: invalid username or password');
      }
      localStorage.setItem('access_token', token);
      resolve(this.page);
    });
  }

  public logOut() {
    localStorage.removeItem('access_token');
  }

  public getToken(user: string, password: string): string {
    return user === this.user && password === this.password ? user + password : null;
  }
}
