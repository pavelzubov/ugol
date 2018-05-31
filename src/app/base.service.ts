import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, pipe} from 'rxjs/index';
import {map} from 'rxjs/internal/operators';
import {Response} from './types.factory';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(public http: HttpClient) {
  }

  public getData(): Observable<Response> {
    return this.http.get('assets/example-set.json').pipe(
      map(res => <Response>res)
    );
  }
}
