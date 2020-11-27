import React from "react";
import { Redirect, Route } from "react-router-native";
import Days from "../Days/Days";
import Weather from "../Weather/Weather";
import useGlobal from "../../store";

export default function privateRoute({component: Component}) {
  const [globalState] = useGlobal();
  const { userData } = globalState;
  console.log("we here?");

  return (
    <Route
          <Route exact path="/weather" component={Weather} />
          <Route exact path="/days" component={Days} />
        <Redirect to="/" />
  );
}
