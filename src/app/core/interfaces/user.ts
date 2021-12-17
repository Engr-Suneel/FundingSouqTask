export interface IUser {
  id: number,
  firstName: string;
  lastName: string;
  email: string;
  personalId: string;
  profileImage: string;
  mobileNo: string;
  gender: string;
  address: IAddress;
  account: IAccount[]
}

export interface IAddress {
  country: string;
  city: string;
  street: string;
  zipCode: number;
}

export interface IAccount {
  accountName: string;
  accountNo: string;
}