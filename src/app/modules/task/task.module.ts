import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';

import { NgApexchartsModule } from 'ng-apexcharts';

import { taskRoutes } from './task-routing.module';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';
import { TaskComponent } from './pages/task/task.component';
import { SearchComponent } from './components/search/search.component';
import { GroupByComponent } from './components/group-by/group-by.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChartColumnComponent } from './components/chart-column/chart-column.component';







@NgModule({
  declarations: [
    TaskComponent,
    DashboardComponent,
    CardComponent,
    ModalComponent,
    SearchComponent,
    GroupByComponent,
    ChartColumnComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(taskRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    NgApexchartsModule
  ]
})
export class TaskModule { }
