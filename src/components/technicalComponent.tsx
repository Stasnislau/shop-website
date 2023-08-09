import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../pages/_app";
import ErrorMessageComponent from "./errorMessageComponent";

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
    </div>
  );
});

export default TechnicalComponent;
