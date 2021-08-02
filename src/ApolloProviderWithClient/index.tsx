import React from "react";
import Async from "react-async";
import { ApolloProvider } from "@apollo/client";

import createClient from "./createClient";
import { CurrentUser } from "../../models";

export default function ApolloProviderWithClient(passthrough: any) {
  return (
    <Async promiseFn={CurrentUser.get}>
      <Async.Fulfilled>
        {() => {
          const client = createClient();
          return <ApolloProvider client={client} {...passthrough} />;
        }}
      </Async.Fulfilled>
      <Async.Rejected>
        {(e) => {
          console.log("RECHAZADO", e);
        }}
      </Async.Rejected>
    </Async>
  );
}
