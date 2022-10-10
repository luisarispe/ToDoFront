import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';


import { Status, Task } from '../../models/task.model';
import { TaskService } from '../../task.service';
import { Observable, of } from 'rxjs';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  task$?: Observable<Task | null>;
  disabledButton: boolean = true;
  disabledForm: boolean = true;
  messageError: boolean = false;


  status: { value: Status, viewValue: string }[] = [
    { value: Status.ToDo, viewValue: 'Que Hacer' },
    { value: Status.Done, viewValue: 'Hecho' },
    { value: Status.Expired, viewValue: 'Expirado' }
  ]
  taskForm: FormGroup = this._formBuilder.group({
    task: ['', [Validators.required, Validators.maxLength(30)]],
    status: ['', Validators.required],
    defeated: ['', Validators.required]
  });
  constructor(private _formBuilder: FormBuilder, private _taskService: TaskService,
    private _dialogRef: MatDialogRef<ModalComponent>, private _toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private _data: { id: string | null }
  ) { }

  ngOnInit(): void {
    if (this._data.id) {
      this._taskService.findOne(this._data.id).subscribe({
        complete: () => this.disabledForm = false
      });
      this.task$ = this._taskService.task$;
      this.task$.subscribe(
        {
          next: (resp) => {
            this.taskForm.patchValue({
              task: resp?.task,
              status: resp?.status,
              defeated: resp?.defeated
            })
          },
          error: () => {
            this.task$ = of(null);
          }
        }
      )
    } else {
      this.disabledForm = false
      this.task$ = of(null);
    }
  }

  create(): void {
    if (this.taskForm.invalid) return;

    this.disabledButton = false;
    this._taskService.create(this.taskForm.value).subscribe({
      error: (error) => {
        this.messageError = true;
        this.disabledButton = true;
      },
      complete: () => {
        this.disabledButton = true;
        this._dialogRef.close();
        this._taskService.findAll().subscribe()
        this._toastr.success('La tarea fue creada!', '');
      }
    });
  }
}


