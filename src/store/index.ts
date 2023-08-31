import { makeAutoObservable } from "mobx";
import { Message } from "@/types";

export interface stateInterface {
  currentCurrency: string;
  currentCategory: "men" | "women" | "kids";
  isLoading: boolean;
  isBeingSubmitted: boolean;
  messages: Message[];
  cartId: string;
  itemsInCart: number;
  shouldUpdateCart: boolean;
  shouldUpdateProducts: boolean;
}
export default class Store {
  state: stateInterface;

  constructor() {
    this.state = {
      currentCurrency: "$",
      currentCategory: "men",
      isLoading: false,
      isBeingSubmitted: false,
      messages: [],
      cartId: "",
      itemsInCart: 0,
      shouldUpdateCart: true,
      shouldUpdateProducts: false,
    };
    makeAutoObservable(this);
  }
  private createMessageId = () => {
    let largestId = 0;
    if (this.state.messages.length === 0) return 1;
    this.state.messages.forEach((message, index) => {
      if (message.id && message.id > largestId) largestId = message.id;
    });
    return largestId + 1;
  };
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
    this.state.messages.push({
      type: "error",
      message,
      id: this.createMessageId(), 
    });
  };
  displaySuccess = (message: string) => {
    this.state.messages.push({
      type: "success",
      message,
      id: this.state.messages.length === 0 ? 0 : this.state.messages.length - 1,
    });
  };
  removeMessage = (id: number) => {
    this.state.messages = this.state.messages.filter((message) => message.id !== id);
  };
  setCartId = (id: string) => {
    this.state.cartId = id;
  };
  setItemsInCart = (items: number) => {
    this.state.itemsInCart = items;
  };
  setShouldUpdateCart = (value: boolean) => {
    this.state.shouldUpdateCart = value;
  };
  setShouldUpdateProducts = (value: boolean) => {
    this.state.shouldUpdateProducts = value;
  };
}
