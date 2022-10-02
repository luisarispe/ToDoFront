import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';


import { Status } from '../../models/task.model';
import { TaskService } from '../../task.service';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  disabledButton:boolean=false;
  messageError:boolean=false;
  status:{value:Status, viewValue:string}[]=[
    {value: Status.ToDo, viewValue: 'Que Hacer'},
    {value: Status.Done, viewValue: 'Hecho'},
    {value: Status.Expired, viewValue: 'Expirado'}
  ]
  taskForm:FormGroup=this._formBuilder.group({
    task:['', [Validators.required, Validators.maxLength(30)]],
    status:['', Validators.required],
    defeated:['', Validators.required]
  });
  constructor(private _formBuilder: FormBuilder,private _taskService: TaskService,
    private _dialogRef: MatDialogRef<ModalComponent>,private _toastr: ToastrService
    ) {}

  ngOnInit(): void {
  }

  create(): void{
    if(this.taskForm.invalid) return;
    
    this.disabledButton=true;
    this._taskService.create(this.taskForm.value).subscribe({
      error:(error)=>{
        this.messageError=true;
        this.disabledButton=false;
      },
      complete: ()=>{
        this.disabledButton=false;
        this._dialogRef.close();
        this._taskService.findAll().subscribe()
        this._toastr.success('La tarea fue creada!', '');
      }
    });
    
  }

}
