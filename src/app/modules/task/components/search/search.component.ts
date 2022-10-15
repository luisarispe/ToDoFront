import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';

@Component({
  selector: 'task-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private _taskService: TaskService) { }

  ngOnInit() {
  }
  searchTask(searchTask: string): void {
    this._taskService.searchTask = searchTask;
  }

}
