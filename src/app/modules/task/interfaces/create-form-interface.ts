import { Status } from '../models/task.model';

export interface CreateTaskForm {
  task: string;
  status: Status;
  defeated: Date;
}