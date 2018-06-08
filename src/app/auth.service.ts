import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = 'test';
  private password = 'test';
  private page = '/calculate';

  constructor() {
  }

  public logIn(user: string, password: string): Observable<any> {
    return fromPromise(new Promise((resolve, reject) => {
      const token = this.getToken(user, password);
      if (!token) {
        reject('Error: invalid username or password');
      }
      localStorage.setItem('access_token', token);
      resolve(this.page);
    }));
  }

  public logOut() {
    localStorage.removeItem('access_token');
  }

  public getToken(user: string, password: string): string {
    // Я просто сверяю лог/пасс с test/test.
    // На этом месте должно быть подключение к бэку и ответ подходит ли лог/пасс
    return user === this.user && password === this.password ? user + password : null;
  }

  public getLocalToken(): string {
    return localStorage.getItem('access_token');
  }
}
