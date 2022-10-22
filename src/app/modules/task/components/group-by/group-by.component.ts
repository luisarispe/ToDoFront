import { Component, OnInit } from '@angular/core';
import { OrderBy } from '../../models/task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'task-group-by',
  templateUrl: './group-by.component.html',
  styleUrls: ['./group-by.component.css']
})
export class GroupByComponent implements OnInit {
  public orderByEnum=OrderBy;

  constructor(private _taskService: TaskService) { }

  ngOnInit(): void {
  }
  orderBy(order: OrderBy) :void{
    this._taskService.orderBy=order;
  }

}
