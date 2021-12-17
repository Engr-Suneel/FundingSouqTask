import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, startWith, withLatestFrom } from 'rxjs/operators';
import { IUser } from 'src/app/core/interfaces/user';
import { EventService } from 'src/app/core/services/event.service';
import { AppConst } from 'src/app/helpers/app-constants';
import { AppRoute } from 'src/app/helpers/app-route.constants';
import { Utils } from 'src/app/helpers/utils';
import { setLoader } from 'src/app/layouts/store/actions/loader.actions';
import { AppState } from 'src/app/store';
import { getCurrentRoute } from 'src/app/store/router/router.selector';
import { deleteUserById, loadUserList } from '../store/actions/users.actions';
import { getUserList } from '../store/selectors/users.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  filterForm: FormGroup;
  users$: Observable<IUser[]> = null!;

  pageNo: number = AppConst.PAGE_NO;
  pageSize: number = AppConst.PAGE_SIZE;
  totalRecords: number = AppConst.TOTAL_RECORDS;
  search: string = "";

  subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.filterForm = this.fb.group({ filter: [''] });

    let userLoaded = this.eventService.subscribe(AppConst.EVENT_USER_LOADED_SUCCESS, () => {
      this.inputChange();
    });

    let userDelete = this.eventService.subscribe(AppConst.EVENT_USER_DELETE_SUCCESS, (result) => {
      console.log(result);
      this.loadUsers();
    });

    this.subscription.add(userLoaded);
    this.subscription.add(userDelete);
  }

  async ngOnInit() {
    this.users$ = this.store.select(getUserList);
    this.loadUsers();

    try {
      let route = await Utils.obserableToPromise(this.store.select(getCurrentRoute));
      if (route && route.queryParams) {
        this.pageNo = route.queryParams?.pageNo ?? AppConst.PAGE_NO;
        this.pageSize = route.queryParams?.pageSize ?? AppConst.PAGE_SIZE;
        this.search = route.queryParams?.search ?? "";
        this.changeQuery();
        if (this.search) {
          this.filterForm.get('filter')?.setValue(this.search);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  inputChange() {
    this.users$ = this.filterForm.get('filter')!.valueChanges.pipe(
      startWith(''),
      withLatestFrom(this.users$),
      map(([val, users]) => {
        this.search = !val ? !this.filterForm.get('filter')?.value ? "" : this.search : val;
        if (this.search) {
          this.pageNo = AppConst.PAGE_NO;
        }
        this.changeQuery();
        return !this.search ? users : users.filter((x) => {
          return x.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
            x.lastName.toLowerCase().includes(this.search.toLowerCase()) ||
            x.email.toLowerCase().includes(this.search.toLowerCase()) ||
            x.gender.toLowerCase().includes(this.search.toLowerCase());
        })
      })
    );
  }

  onPageChange(pageNo: number) {
    this.pageNo = pageNo;
    this.changeQuery();
  }

  onRecordChange(pageSize: number) {
    this.pageSize = pageSize;
    this.changeQuery();
  }

  changeQuery() {
    this.router.navigate(['.'], {
      relativeTo: this.route, queryParams: {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        search: this.search
      }
    });
  }

  loadUsers() {
    this.store.dispatch(setLoader({ isLoading: true }));
    this.store.dispatch(loadUserList());
  }

  viewUserDetail(user: IUser) {
    if (user && user.id) {
      this.router.navigate(['users-view', user.id]);
    }
  }

  editUserDetail(user: IUser) {
    let id = user ? user.id : 0;
    this.router.navigate(['users-create', id]);
  }

  deleteUserDetail(user: IUser) {
    if (user && user.id) {
      if (confirm("Are you sure you want to delete")) {
        this.store.dispatch(setLoader({ isLoading: true }));
        this.store.dispatch(deleteUserById({ id: user.id }));
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
