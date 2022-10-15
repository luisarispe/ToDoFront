import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, delay, map, Observable, tap } from 'rxjs';
import { CreateTaskForm } from './interfaces/create-form-interface';
import { environment } from '../../../environments/environment';
import { Task } from './models/task.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  private _searchTask: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) {
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



  create(data: CreateTaskForm) {
    return this.http.post(`${base_url}task`, data);
  }

  update(data: CreateTaskForm, id: string) {
    return this.http.patch(`${base_url}task/${id}`, data);
  }

  findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(`${base_url}task`).pipe(
      tap((tasks) => {
        this._tasks.next(tasks)
      })
    );
  }

  findOne(id: string): Observable<Task> {
    return this.http.get<Task>(`${base_url}task/${id}`);
  }

}
