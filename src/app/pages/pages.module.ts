import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppConst } from '../helpers/app-constants';
import { pagesReducers, PagesEffects } from './store';
import { SharedModule } from '../shared/shared.module';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { UserService } from '../core/services/users.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    UsersCreateComponent,
    UsersViewComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature(AppConst.PAGES_FEATURE_SELECTOR, pagesReducers),
    EffectsModule.forFeature(PagesEffects)
  ],
  providers: [
    UserService
  ]
})
export class PagesModule { }
