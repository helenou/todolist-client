import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../shared/todo/todo.service';
//import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit, OnDestroy {
  todo: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private todoService: TodoService
              //private giphyService: GiphyService
              ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.todoService.get(id).subscribe((todo: any) => {
          if (todo) {
            this.todo = todo;
            this.todo.href = todo._links.self.href;
            //this.giphyService.get(todo.title).subscribe(url => todo.giphyUrl = url);
          } else {
            console.log(`Todo with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/todo-list']);
  }

  save(form: NgForm) {
    this.todoService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.todoService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}