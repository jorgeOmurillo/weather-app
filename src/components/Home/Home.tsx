import React from "react";
import {Text, View} from 'react-native'
import { Redirect } from "react-router-native";
import Async from "react-async";
import Loading from "../Loading/Loading";

import { CurrentUser } from "../../../models";

export default function Home() {
  return (
    <Async promiseFn={CurrentUser.get}>
      <Async.Pending>
        <Loading />
      </Async.Pending>

      <Async.Fulfilled>
        {(user: any) => {
          if (!user) {
            return <Redirect to="/login" />;
          }
          return <Redirect to="/weather" />;
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
