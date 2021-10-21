import React from 'react';
import {Route} from 'react-router-native';

import ApolloProviderWithClient from './ApolloProviderWithClient';
import {Days, Weather} from './components';

export default function restrictedRoutes() {
  return (
    <ApolloProviderWithClient>
      <Route exact path="/weather" component={Weather} />
      <Route exact path="/days" component={Days} />
    </ApolloProviderWithClient>
  );
}
