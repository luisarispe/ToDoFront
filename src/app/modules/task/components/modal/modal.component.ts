import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';

import { Status} from '../../models/task.model';
import { TaskService } from '../../task.service';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  disabledButton: boolean = true;
  disabledForm: boolean = true;
  messageError: boolean = false;
  idTask:string;

  status: { value: Status, viewValue: string }[] = [
    { value: Status.ToDo, viewValue: 'Que Hacer' },
    { value: Status.Done, viewValue: 'Hecho' },
    { value: Status.Expired, viewValue: 'Expirado' }
  ];
  taskForm: FormGroup = this._formBuilder.group({
    task: ['', [Validators.required, Validators.maxLength(30)]],
    status: ['', Validators.required],
    defeated: ['', Validators.required]
  });

  constructor(private _formBuilder: FormBuilder, private _taskService: TaskService,
    private _dialogRef: MatDialogRef<ModalComponent>, private _toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private _data: { id: string}
  ) {
    this.idTask=_data.id;
   }

  ngOnInit(): void {
    this.findOne();
  }

  create(): void {
    if (this.taskForm.invalid){
      this.taskForm.markAllAsTouched();
      return
    }

    this.disabledButton = false;
    this._taskService.create(this.taskForm.value).subscribe({
      complete: () => {
        this.disabledButton = true;
        this._dialogRef.close();
        this._taskService.findAll().subscribe()
        this._toastr.success('La tarea fue creada!', '');
      },
      error: (error) => {
        this.messageError = true;
        this.disabledButton = true;
      }
    });
  }
  update(): void{
    if (this.taskForm.invalid) return;

    this.disabledButton = false;
    this._taskService.update(this.taskForm.value, this.idTask).subscribe({
      complete: () => {
        this.disabledButton = true;
        this._dialogRef.close();
        this._taskService.findAll().subscribe()
        this._toastr.success('La tarea fue actualizada!', '');
      },
      error: (error) => {
        this.messageError = true;
        this.disabledButton = true;
      }
    });
  }
  findOne():void{

    if (this.idTask!=='0') {
      this._taskService.findOne(this._data.id).subscribe({
        next: (resp) => {
          this.disabledForm = false;
          this.taskForm.patchValue({
            task: resp?.task,
            status: resp?.status,
            defeated: resp?.defeated
          })
        },
        error:(error)=>{
          this._dialogRef.close();
        }
      });
    }else{
      this.disabledForm = false
    }
  }
}


