import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/core/interfaces/user';
import { AppConst } from 'src/app/helpers/app-constants';
import { Utils } from 'src/app/helpers/utils';
import { AppState } from 'src/app/store';
import { getCurrentRoute } from 'src/app/store/router/router.selector';
import { getUserById } from '../store/selectors/users.selectors';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit {

  user: IUser = null!;
  userNotFoundMsg: string = "";
  queryParams: any = {
    pageSize: AppConst.PAGE_SIZE,
    pageNo: AppConst.PAGE_NO,
    search: ""
  }

  constructor(
    private store: Store<AppState>,
  ) { }

  async ngOnInit() {
    let route = await Utils.obserableToPromise(this.store.select(getCurrentRoute));
    if (route && route.params['id']) {
      this.store.select(getUserById).subscribe((user) => {
        if (user) {
          this.userNotFoundMsg = "";
          this.user = user;
        } else {
          this.userNotFoundMsg = "User Not Found! please go back and try with another";
        }
      })
    } else {
      this.userNotFoundMsg = "User Not Found! please go back and try with another";
    }
  }

}
