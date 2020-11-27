import React from "react";
import { NativeRouter, Route } from "react-router-native";
import { decode, encode } from "base-64";

import { CurrentUser } from "./models";
import { Days, Home, Login, Registration, Weather } from "./src/components";

const globalAny: any = global;

if (!globalAny.btoa) {
  globalAny.btoa = encode;
}
if (!globalAny.atob) {
  globalAny.atob = decode;
}

export default function App() {
  CurrentUser.get();

  return (
    <NativeRouter initialEntries={["/"]}>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/registration" component={Registration} />
      <Route exact path="/weather" component={Weather} />
      <Route exact path="/days" component={Days} />
    </NativeRouter>
  );
}
