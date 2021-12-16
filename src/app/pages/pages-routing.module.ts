import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoute } from '../helpers/app-route.constants';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: AppRoute.ROUTE_DASHBOARD },
  { path: AppRoute.ROUTE_DASHBOARD, component: DashboardComponent },
  { path: AppRoute.ROUTE_USERS, component: UsersComponent },
  { path: AppRoute.ROUTE_USERS_VIEW, component: UsersViewComponent },
  { path: AppRoute.ROUTE_USERS_CREATE, component: UsersCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
