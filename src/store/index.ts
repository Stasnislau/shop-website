import { makeAutoObservable } from "mobx";

export interface stateInterface {
  currentCurrency: string;
  currentCategory: "men" | "women" | "kids";
  isLoading: boolean;
  isBeingSubmitted: boolean;
  isErrorDisplayed: boolean;
  errorMessage: string | null;
  isSuccessDisplayed: boolean;
  successMessage: string | null;
}
export default class Store {
  state: stateInterface;

  constructor() {
    this.state = {
      currentCurrency: "$",
      currentCategory: "men",
      isLoading: false,
      isBeingSubmitted: false,
      isErrorDisplayed: false,
      errorMessage: null,
      isSuccessDisplayed: false,
      successMessage: null,
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
  setIsBeingSubmitted = (newValue: boolean) => {
    this.state.isBeingSubmitted = newValue;
  };
  displayError = (message: string) => {
    this.state.isErrorDisplayed = true;
    this.state.errorMessage = message;
  };
  hideError = () => {
    this.state.isErrorDisplayed = false;
    this.state.errorMessage = null;
  };
  displaySuccess = (message: string) => {
    this.state.isSuccessDisplayed = true;
    this.state.successMessage = message;
  };
  hideSuccess = () => {
    this.state.isSuccessDisplayed = false;
    this.state.successMessage = null;
  };
}
