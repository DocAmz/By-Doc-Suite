import { makeAutoObservable } from "mobx";
import { IuserPublic } from "../type/user.type";

class DashboardStore {

  displayProfile: boolean = false;
  user: IuserPublic | undefined = undefined

  constructor() {
    makeAutoObservable(this);
  }

  setDisplayProfile = () => {
    this.displayProfile = !this.displayProfile
  }

  setUser = (value: IuserPublic) => {
    this.user = value
  }

  getUser = () => {
    return this.user
  }


}

// eslint-disable-next-line import/no-anonymous-default-export
export default new DashboardStore()