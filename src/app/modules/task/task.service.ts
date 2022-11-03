import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as uuid from 'uuid';


import { CreateTaskForm } from './interfaces/create-form-interface';
import { OrderBy, Status, Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _listTask: Task[] = [];
  private _tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  private _searchTask: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _orderBy: BehaviorSubject<OrderBy> = new BehaviorSubject<OrderBy>(OrderBy.DATE_DESC);


  constructor(private http: HttpClient) {
    this._listTask.push(
      {
        id: uuid.v4(),
        task: 'Llamar a Papá',
        status: Status.Done,
        defeated: new Date(),
        createdAt: new Date()
      },
      {
        id: uuid.v4(),
        task: 'Llamar a Mamá',
        status: Status.Expired,
        defeated: new Date(),
        createdAt: new Date()
      },
      {
        id: uuid.v4(),
        task: 'Comprar Pan',
        status: Status.ToDo,
        defeated: new Date(),
        createdAt: new Date()
      },
      {
        id: uuid.v4(),
        task: 'Viajar a Arica',
        status: Status.ToDo,
        defeated: new Date(),
        createdAt: new Date()
      },
      {
        id: uuid.v4(),
        task: 'Estudiar Angular',
        status: Status.Expired,
        defeated: new Date(),
        createdAt: new Date()
      }
    );
    this._tasks.next(this._listTask);
  }


  get tasks$(): Observable<Task[]> {
    return this._tasks.asObservable();
  }

  set searchTask(search: string) {
    this._searchTask.next(search);
  }
  get searchTask$(): Observable<string> {
    return this._searchTask.asObservable();
  }

  set orderBy(order: OrderBy) {
    this._orderBy.next(order);
  }
  get orderBy$(): Observable<OrderBy> {
    return this._orderBy.asObservable();
  }

  create(data: CreateTaskForm) {
    let task: Task = {
      id: uuid.v4(),
      task: data.task,
      status: data.status,
      defeated: data.defeated,
      createdAt: new Date()
    }
    this._listTask.push(task);
    return of(task);
  }

  update(data: CreateTaskForm, id: string) {
    let taskUpdate: Task = this._listTask.find(task => task.id === id)!;
    this._listTask = this._listTask.map((task: Task) => {
      if (task.id === id) {
        let taskDB = { ...taskUpdate, ...data }
        return taskDB;
      }
      return task;
    });

    this._tasks.next(this._listTask);
    return of(taskUpdate);
  }

  findAll(): Observable<Task[]> {
    this._tasks.next(this._listTask);
    return of(this._listTask);
  }

  findOne(id: string): Observable<Task> {
    let task: Task = this._listTask.find(task => task.id === id)!;
    if (!task) throw new Error('No existe tarea');
    return of(task);
  }

}
