import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public API = 'http://localhost:8080';
  public TODO_API = this.API + '/todo';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.TODO_API + '/all');
  }

  get(id: string) {
    return this.http.get(this.TODO_API + '/find/' + id);
  }

  save(todo: any): Observable<any> {
    let result: Observable<any>;
    if (todo.href) {
      result = this.http.put(todo.href + '/update', todo);
    } else {
      result = this.http.post(this.TODO_API + '/add', todo);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}