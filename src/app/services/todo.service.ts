import { Injectable } from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

import {Observable} from 'rxjs';

import {map} from 'rxjs/operators';
import { TaskI } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoCollection: AngularFirestoreCollection<TaskI>;
  
  private todos: Observable<TaskI[]>;
  
  constructor(db: AngularFirestore) {

    this.todoCollection = db.collection<TaskI>('todos');

    this.todos = this.todoCollection.snapshotChanges().pipe(
      map(actions => {

                  return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return {id, ...data};
                  });
                }
    ));
                                    
   }

   getTodos(){

    return this.todos;
   }

   getTodo(id: string){

      return this.todoCollection.doc<TaskI>(id).valueChanges();
   }

   updateTodo(task: TaskI, id: string){

    return this.todoCollection.doc(id).update(task);
   }

   addTodo(task: TaskI){

    return this.todoCollection.add(task);
   }

   removeTodo(id: string){

    return this.todoCollection.doc(id).delete();
   }
}
