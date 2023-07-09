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

  setCurrentCurrency = (currency: string) => {
    this.state.currentCurrency = currency;
  };
  setCurrentCategory = (Category: "men" | "women" | "kids") => {
    this.state.currentCategory = Category;
  };
}
