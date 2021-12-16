import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { AzPaginationComponent } from './az-pagination/az-pagination.component';



@NgModule({
  declarations: [
    LoaderComponent,
    AzPaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoaderComponent,
    AzPaginationComponent
  ]
})
export class SharedModule { }
