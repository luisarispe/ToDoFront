import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { CreateTaskForm } from './interfaces/create-form-interface';
import { environment } from '../../../environments/environment';
import { Task } from './models/task.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) { 
  }


  get tasks$(): Observable<Task[]>{
    return this._tasks.asObservable();
  }

  create(data:CreateTaskForm){
    return this.http.post(`${base_url}task`, data).pipe();
  }
  findAll(): Observable<Task[]>{
    return this.http.get<Task[]>(`${base_url}task`).pipe(
      tap((tasks)=>{
        this._tasks.next(tasks)
      })
    );
  }

}
