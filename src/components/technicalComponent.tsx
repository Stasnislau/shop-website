import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../pages/_app";
import ErrorMessageComponent from "./errorMessageComponent";
import LoadingSpinner from "./loadingSpinner";

const TechnicalComponent = observer(() => {
  const store = useContext(Context);

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 5000,
        
      }}
    >
      {store.state.isErrorDisplayed && <ErrorMessageComponent />}
      {/* {store.state.isLoading && <LoadingSpinner />} */}
    </div>
  );
});

export default TechnicalComponent;
