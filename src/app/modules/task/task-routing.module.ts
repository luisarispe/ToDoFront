import { Route } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TaskComponent } from './pages/task/task.component';

export const taskRoutes: Route[] = [

    { path: '', component: TaskComponent },
    { path: 'dashboard', component: DashboardComponent }

];
