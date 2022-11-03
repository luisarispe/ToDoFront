import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Task } from './models/task.model';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class TaskResolver implements Resolve<Task[]> {
  constructor(private _taskService: TaskService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task[]> {
    return this._taskService.findAll();
  }
}
