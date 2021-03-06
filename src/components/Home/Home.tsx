import React from "react";
import { Redirect } from "react-router-native";
import Loading from "../Loading/Loading";

import useGlobal from "../../store";

export default function Home() {
  const [globalState] = useGlobal();
  const { loading, userData } = globalState;

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return <Redirect to="/login" />;
  }

  return <Redirect to="/weather" />;
}
