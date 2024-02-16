import { makeAutoObservable } from "mobx";

class DashboardStore {

  displayProfile: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setDisplayProfile = () => {
    this.displayProfile = !this.displayProfile
  }


}

// eslint-disable-next-line import/no-anonymous-default-export
export default new DashboardStore()