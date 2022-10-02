import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ModalComponent } from '../../components/modal/modal.component';

import {Task} from "../../models/task.model";
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit , OnDestroy{
  
  tasks$!: Observable<Task[]>;
  obs_tasks?:Subscription;
  today:Date=new Date();

  constructor(private _dialog: MatDialog, private _taskService: TaskService) { }
  
  ngOnInit(): void {
    this.tasks$=this._taskService.tasks$;
    this.obs_tasks=this._taskService.tasks$.subscribe();
    this.findAll();
  }
  openDialog() {
    this._dialog.open(ModalComponent);
  }

  findAll(): void{
    this._taskService.findAll().subscribe();
  }
  ngOnDestroy(): void {
    this.obs_tasks?.unsubscribe();
  }
  

}


