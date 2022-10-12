import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ModalComponent } from '../../components/modal/modal.component';

import { Task } from "../../models/task.model";
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks$!: Observable<Task[]>;
  today: Date = new Date();

  constructor(private _dialog: MatDialog, private _taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks$ = this._taskService.tasks$;
    this._taskService.tasks$.subscribe();
    this.findAll();
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


