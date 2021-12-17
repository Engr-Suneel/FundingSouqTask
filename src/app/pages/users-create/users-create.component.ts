import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ICountry } from 'src/app/core/interfaces/country';
import { IUser } from 'src/app/core/interfaces/user';
import { EventService } from 'src/app/core/services/event.service';
import { AppConst } from 'src/app/helpers/app-constants';
import { AppRoute } from 'src/app/helpers/app-route.constants';
import { CustomValidation } from 'src/app/helpers/custom-validation';
import { Utils } from 'src/app/helpers/utils';
import { setLoader } from 'src/app/layouts/store/actions/loader.actions';
import { AppState } from 'src/app/store';
import { getCurrentRoute } from 'src/app/store/router/router.selector';
import { Countries } from 'src/assets/mock-data/country';
import { addNewUser, editUserById } from '../store/actions/users.actions';
import { getUserById } from '../store/selectors/users.selectors';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  personalId: FormControl;
  profileImage: FormControl;
  mobileNo: FormControl;
  gender: FormControl;

  address: FormGroup;
  country: FormControl;
  city: FormControl;
  street: FormControl;
  zipCode: FormControl;

  account: FormArray;

  submitted: boolean = false;
  accountSubmitted: boolean = false;
  queryParams: any = {
    pageSize: AppConst.PAGE_SIZE,
    pageNo: AppConst.PAGE_NO,
    search: ""
  }

  title: string = "Create User";
  countryList: ICountry[] = [];
  selectedCountry: ICountry;
  mobileHasError: boolean = false;
  genderList: string[] = ["Male", "Female"];
  isEdit: boolean = false;
  userNotFoundMsg: string = "";
  successMsg: string = "";
  contactNo: string = "";
  editId: any;

  subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private eventService: EventService,
    private router: Router
  ) {

    this.countryList = Countries;
    this.selectedCountry = this.countryList.find(o => o.code == "PK")!;

    this.firstName = new FormControl('', [Validators.required, CustomValidation.MaxCharacterLimit()]);
    this.lastName = new FormControl('', [Validators.required, CustomValidation.MaxCharacterLimit()]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.personalId = new FormControl('', [Validators.required, CustomValidation.PersoanlIdLimit()]);
    this.profileImage = new FormControl('');
    this.mobileNo = new FormControl('', [Validators.required]);
    this.gender = new FormControl('', [Validators.required]);

    this.country = new FormControl({ value: this.selectedCountry.name, disabled: true });
    this.city = new FormControl('');
    this.street = new FormControl('');
    this.zipCode = new FormControl('');

    this.address = this.fb.group({
      country: this.country,
      city: this.city,
      street: this.street,
      zipCode: this.zipCode
    });

    this.account = this.fb.array([], [Validators.required]);

    this.userForm = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      personalId: this.personalId,
      profileImage: this.profileImage,
      mobileNo: this.mobileNo,
      gender: this.gender,
      address: this.address,
      account: this.account
    });


    let addedSuccess = this.eventService.subscribe(AppConst.EVENT_USER_ADDED_SUCCESS, () => {
      this.successMsg = "User Successfully created! please go back and check the result!";
      this.goToList(); // I added this because of refresh whole page
    });

    let updateSuccess = this.eventService.subscribe(AppConst.EVENT_USER_EDITED_SUCCESS, () => {
      this.successMsg = "User data saved successfully! please go back and check the result!";
      this.goToList(); // I added this because of refresh whole page
    });

    this.subscription.add(addedSuccess);
    this.subscription.add(updateSuccess);
  }

  goToList() {
    this.router.navigate([AppRoute.ROUTE_USERS], { queryParams: this.queryParams });
  }

  async ngOnInit() {
    let route = await Utils.obserableToPromise(this.store.select(getCurrentRoute));
    if (route && route.params['id'] != "0") {
      this.title = "Edit User";
      this.isEdit = true;
      this.userNotFoundMsg = "";
      this.editId = route.params['id'];
      this.store.select(getUserById).subscribe((user) => {

        if (user) {
          this.contactNo = user.mobileNo;

          this.userForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            personalId: user.personalId,
            profileImage: user.profileImage,
            mobileNo: user.mobileNo,
            gender: user.gender,
            address: user.address,
            account: user.account
          });

          if (user.address.country) {
            this.selectedCountry = this.countryList.find(o => o.name == user.address.country)!
          }

          if (user.account.length) {
            for (let i = 0; i < user.account.length; i++) {
              let account = user.account[i];
              this.createAccountGroup(account.accountName, account.accountNo)
            }
          }
        } else {
          this.userNotFoundMsg = "User Not Found! please go back and try with another";
        }
      })
    }
  }

  get f() {
    return this.userForm.controls;
  }

  get fa() {
    return this.address.controls;
  }

  get faArray(): FormArray {
    return <FormArray>this.f.account;
  }

  hasError(isError: boolean) {
    this.mobileHasError = !isError;
  }

  getNumber(number: string) {
    if (!this.mobileHasError) {
      this.f.mobileNo.setValue(number);
    } else {
      this.f.mobileNo.setValue("");
    }
  }

  onCountryChange(country: any) {
    if (country && country.iso2) {
      let findCountry = this.countryList.find(o => o.code == country.iso2.toUpperCase());
      if (findCountry) {
        this.selectedCountry = findCountry;
        this.fa.country.setValue(this.selectedCountry.name);
      }
    }
  }

  createAccountGroup(name: string, no: string) {
    let accountGroup = this.fb.group({
      accountName: [name, [Validators.required]],
      accountNo: [no, [Validators.required]],
    });
    this.faArray.push(accountGroup);
  }

  deleteAccount(index: number) {
    if (index < 0) {
      return;
    }
    this.faArray.removeAt(index);
  }

  submit() {
    this.submitted = true;
    this.accountSubmitted = true;
    if (this.userForm.invalid) {
      return;
    }

    let data = this.userForm.value as IUser;
    data.address.country = this.selectedCountry.name;

    if (!data) {
      return;
    }

    this.store.dispatch(setLoader({ isLoading: true }));
    if (this.isEdit) {
      data.id = parseInt(this.editId);
      this.store.dispatch(editUserById({ payload: data, id: parseInt(this.editId) }));
    } else {
      data.id = new Date().getTime();
      this.store.dispatch(addNewUser({ payload: data }));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
} 
