import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, Observable, Subscription, map, distinctUntilChanged } from 'rxjs';
import { ModalComponent } from '../../components/modal/modal.component';

import { Task } from "../../models/task.model";
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks$: Observable<Task[]> = new Observable();
  searchTask$: Observable<string> = new Observable();
  today: Date = new Date();

  constructor(private _dialog: MatDialog, private _taskService: TaskService) { }

  ngOnInit(): void {
    this.findAll();
    this.searchTask$ = this._taskService.searchTask$;

    this.tasks$ = combineLatest([this._taskService.tasks$, this.searchTask$]).pipe(
      map(([tasks, searchTask]) => {

        let filterTasks = tasks;
        if (searchTask.length > 0) {

          searchTask = searchTask.trim().toLowerCase()
          filterTasks = tasks.filter(task => task.task.toLowerCase().includes(searchTask) || task.defeated.toString().includes(searchTask))
        }
        return filterTasks
      })
    );
  }

  openDialog(id: string) {
    this._dialog.open(ModalComponent, {
      data: {
        id
      }
    });
  }

  findAll(): void {
    this._taskService.findAll().subscribe();
  }
}


