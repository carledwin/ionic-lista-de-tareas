import { TodoService } from './../services/todo.service';
import { Component } from '@angular/core';
import { TaskI } from '../models/task.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todos: TaskI[];

  constructor(private todoService: TodoService) {}

  ngOnInit(){

    this.todoService.getTodos().subscribe(
      resp => {
        this.todos = resp;     
        console.log('Tareas: ', resp)
    });
  }
}
