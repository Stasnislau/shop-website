import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../pages/_app";
import MessageComponent from "./messageComponent";
import LoadingSpinner from "./loadingSpinner";
import { API_URL } from "./header";

const TechnicalComponent = observer(() => {
  const store = useContext(Context);
  const createCart = async () => {
    try {
      const response = await fetch(`${API_URL}/cart/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status < 200 || response.status >= 300) {
        throw new Error(data.message);
      }
      localStorage.setItem("cartId", String(data));
      store.setCartId(data.id);
    } catch (error: any) {
      store.displayError(error.message);
    }
  };
  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("cartId")) {
        await createCart();
      } else {
        store.setCartId(localStorage.getItem("cartId") as string);
      }
    })();
  }, [store.state.cartId]);
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 5000,
      }}
    >
      {store.state.isBeingSubmitted && <LoadingSpinner />}
      <MessageComponent />
    </div>
  );
});

export default TechnicalComponent;
