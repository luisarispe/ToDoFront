import { Route } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TaskComponent } from './pages/task/task.component';
import { TaskResolver } from './task.resolver';

export const taskRoutes: Route[] = [

    { path: '', component: TaskComponent, resolve: { task: TaskResolver } },
    { path: 'dashboard', component: DashboardComponent, resolve: { task: TaskResolver } }

];
