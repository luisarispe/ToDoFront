import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'task' },

  { path: '',
    component: LayoutComponent,
    children:[
      { path: 'task', loadChildren: ()=>import('./modules/task/task.module').then(m=>m.TaskModule) },

    ]
  },
];
