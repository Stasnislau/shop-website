import { makeAutoObservable } from "mobx";

export interface stateInterface {
  currentCurrency: string;
  currentCategory: "men" | "women" | "kids";
  isLoading: boolean;
  isErrorDisplayed: boolean;
  errorMessage: string | null;
}
export default class Store {
  state: stateInterface;

  constructor() {
    this.state = {
      currentCurrency: "$",
      currentCategory: "men",
      isLoading: false,
      isErrorDisplayed: false,
      errorMessage: null,
    };
    makeAutoObservable(this);
  }

  setCurrentCurrency = (currency: string) => {
    this.state.currentCurrency = currency;
  };
  setCurrentCategory = (Category: "men" | "women" | "kids") => {
    this.state.currentCategory = Category;
  };
  setIsLoading = (newValue: boolean) => {
    this.state.isLoading = newValue;
  };
  displayError = (message: string) => {
    this.state.isErrorDisplayed = true;
    this.state.errorMessage = message;
  };
  hideError = () => {
    this.state.isErrorDisplayed = false;
    this.state.errorMessage = null;
  };
}
