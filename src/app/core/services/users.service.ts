import { Injectable } from "@angular/core";
import { AppConst } from "src/app/helpers/app-constants";
import { IUser } from "../interfaces/user";
import { ApiProvider } from "./api.provider.service";

@Injectable()
export class UserService {
  constructor(
    private apiProvider: ApiProvider
  ) {

  }

  users = {
    all: () => {
      let baseUrl = `${AppConst.BASE_URL}${AppConst.USERS}`;
      return this.apiProvider.get<IUser[]>(baseUrl);
    },
    delete: (id: number) => {
      let baseUrl = `${AppConst.BASE_URL}${AppConst.USERS}/${id}`;
      return this.apiProvider.delete(baseUrl);
    }
  }
}