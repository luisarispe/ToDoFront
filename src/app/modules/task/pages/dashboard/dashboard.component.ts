import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Status, Task } from '../../models/task.model';
import { TaskService } from '../../task.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  taskSubs: Subscription = new Subscription();
  countDone: number = 0;
  countTodo: number = 0;
  countExpired: number = 0;

  constructor(private _serviceTask: TaskService) {
    this.taskSubs = this._serviceTask.tasks$.subscribe({
      next: (tasks) => {
        this.countDone = this.countStatus(Status.Done, tasks);
        this.countTodo = this.countStatus(Status.ToDo, tasks);
        this.countExpired = this.countStatus(Status.Expired, tasks);
      },
      error: () => {
        this.countDone = 0;
        this.countTodo = 0;
        this.countExpired = 0;
      }
    });
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.taskSubs.unsubscribe()
  }

  countStatus(status: Status, tasks: Task[]): number {
    let array_filter = tasks.filter(task => task.status == status);
    return array_filter.length;
  }
}
