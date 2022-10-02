import { Component, Input, OnInit } from '@angular/core';
import { Status} from '../../models/task.model';

@Component({
  selector: 'task-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input('id') id:string='';
  @Input('task') task:string='';
  @Input('status') status:Status=Status.ToDo
  @Input('defeated') defeated:Date=new Date()
  public icon:string='';
  public color:string='';
  constructor() {
   }

  ngOnInit(): void {
    switch (this.status) {
      case Status.Done:
        this.color='primary';
        this.icon='check_circle';
        break;
      case Status.ToDo:
        this.color='accent';
        this.icon='av_timer';
        break;
      case Status.Expired:
        this.color='warn';
        this.icon='error_outline';
        break;
      default:
        this.icon='';
        this.color='';
        break;
    }
  }

}
