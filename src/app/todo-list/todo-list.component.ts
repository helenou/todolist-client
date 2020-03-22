import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Array<any>;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getAll().subscribe(data => {
      this.todos = data;
    });
  }
}
