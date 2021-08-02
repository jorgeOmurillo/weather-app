import React from "react";
import { NativeRouter, Route } from "react-router-native";
import { decode, encode } from "base-64";

import { Home, Login, Registration } from "./src/components";
import restrictedRoutes from "./src/restrictedRoutes";

const globalAny: any = global;

if (!globalAny.btoa) {
  globalAny.btoa = encode;
}
if (!globalAny.atob) {
  globalAny.atob = decode;
}

export default function App() {
  return (
    <NativeRouter initialEntries={["/"]}>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/registration" component={Registration} />
      {restrictedRoutes()}
    </NativeRouter>
  );
}
