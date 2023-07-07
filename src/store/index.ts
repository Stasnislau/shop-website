import { makeAutoObservable } from "mobx";

export interface stateInterface {
  currentCurrency: string;
  currentCategory: "men" | "women" | "kids";
}
export default class Store {
  state: stateInterface;

  constructor() {
    this.state = {
      currentCurrency: "$",
      currentCategory: "men",
    };
    makeAutoObservable(this);
  }
}
