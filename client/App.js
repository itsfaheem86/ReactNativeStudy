import {ApolloProvider} from '@apollo/client';
import React from 'react';
import 'react-native-gesture-handler';
import Home from './src/screens/Home';
import apolloClient from './src/utils/apollo-client';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Home />
    </ApolloProvider>
  );
}

export default App;
