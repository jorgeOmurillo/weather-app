import React from "react";
import { Route } from "react-router-native";
import { Days, Weather } from "./components";
import useGlobal from "./store";

export default function restrictedRoutes() {
  const [globalState] = useGlobal();
  const { userData } = globalState;

  return (
    <>
      {userData && (
        <>
          <Route exact path="/weather" component={Weather} />
          <Route exact path="/days" component={Days} />
        </>
      )}
    </>
  );
}
