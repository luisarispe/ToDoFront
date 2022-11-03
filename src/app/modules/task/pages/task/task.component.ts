import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, Observable, map } from 'rxjs';
import { ModalComponent } from '../../components/modal/modal.component';

import { OrderBy, Task } from '../../models/task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks$: Observable<Task[]> = new Observable();
  searchTask$: Observable<string> = new Observable();
  orderBy$: Observable<OrderBy> = new Observable();

  today: Date = new Date();

  constructor(private _dialog: MatDialog, private _taskService: TaskService) { }

  ngOnInit(): void {
    this.searchTask$ = this._taskService.searchTask$;
    this.orderBy$ = this._taskService.orderBy$;

    this.tasks$ = combineLatest([this._taskService.tasks$, this.searchTask$, this.orderBy$]).pipe(
      map(([tasks, searchTask, orderBy]) => {

        let filterTasks: Task[] = tasks;
        if (searchTask.length > 0) {

          searchTask = searchTask.trim().toLowerCase();

          filterTasks = tasks.filter(task => task.task.toLowerCase().includes(searchTask) || task.defeated.toString().includes(searchTask))
        }
        /*ORDENAR*/
        filterTasks = this.orderBy(filterTasks, orderBy);

        return filterTasks
      })
    );
  }
  orderBy(tasks: Task[], order: OrderBy): Task[] {

    switch (order) {
      case OrderBy.DATE_ASC:
        return tasks.sort(
          (p1, p2) => (p1.defeated > p2.defeated) ? 1 : (p1.defeated < p2.defeated) ? -1 : 0);
        break;
      case OrderBy.DATE_DESC:
        return tasks.sort(
          (p1, p2) => (p1.defeated < p2.defeated) ? 1 : (p1.defeated > p2.defeated) ? -1 : 0);
        break;
      case OrderBy.TASK_ASC:
        return tasks.sort(
          (p1, p2) => (p1.task > p2.task) ? 1 : (p1.task < p2.task) ? -1 : 0);
        break;
      case OrderBy.TASK_DESC:
        return tasks.sort(
          (p1, p2) => (p1.task < p2.task) ? 1 : (p1.task > p2.task) ? -1 : 0);
        break;
      default:
        return tasks
        break;
    }
  }

  openDialog(id: string) {
    this._dialog.open(ModalComponent, {
      data: {
        id
      }
    });
  }
}


