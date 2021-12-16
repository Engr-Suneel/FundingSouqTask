import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AppConst } from 'src/app/helpers/app-constants';

@Component({
  selector: 'az-paginations',
  templateUrl: './az-pagination.component.html',
  styleUrls: ['./az-pagination.component.css']
})
export class AzPaginationComponent implements OnChanges {

  @Input() totalRecords: number = AppConst.TOTAL_RECORDS;
  @Input() size: number = AppConst.PAGE_SIZE;
  @Input() currentPage: number = AppConst.PAGE_NO;
  @Input() isShowChangeRange: boolean = true;

  @Output() pageClicked = new EventEmitter<number>();
  @Output() recordChange = new EventEmitter<number>();

  pagesRange: number[] = [];

  recordPerPage: number = AppConst.PAGE_SIZE;
  recordPerPageList: number[] = [];

  constructor() {
    this.refreshRecordPerPage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.totalRecords || this.size) {
      let numberOfPages = Math.ceil(this.totalRecords / this.size);
      for (let i = 0; i < numberOfPages; i++) {
        this.pagesRange.push(i + 1);
      }
    }

    if ('size' in changes) {
      this.refreshRecordPerPage();
    }
  }

  refreshRecordPerPage() {
    this.recordPerPageList = [5, 10, 25, 50];
  }

  onPageClicked(i: number) {
    if (this.currentPage != i) {
      this.currentPage = i;
      this.pageClicked.emit(i);
    }
  }

  onRecordChange() {
    this.recordChange.emit(this.recordPerPage);
  }
}
