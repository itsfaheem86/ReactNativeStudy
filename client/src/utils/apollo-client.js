import {ApolloClient, ApolloLink, InMemoryCache, split} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createUploadLink} from 'apollo-upload-client';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {
  APOLLO_HITPOINT_URL,
  APOLLO_SERVER_TWO_HITPOINT_URL,
  APOLLO_WS_URL,
} from '../constants/api';

const httpLink = createUploadLink({
  uri: APOLLO_HITPOINT_URL,
});

const httpLinkServerTwo = createUploadLink({
  uri: APOLLO_SERVER_TWO_HITPOINT_URL,
});

const client = new SubscriptionClient(APOLLO_WS_URL, {
  reconnect: true,
  minTimeout: 55000,
});

client.use([
  {
    async applyMiddleware(operationOptions, next) {
      operationOptions.variables['Authorization'] = await AsyncStorage.getItem(
        'token',
      );
      next();
    },
  },
]);

const wsLink = new WebSocketLink(client);

const authLink = setContext(async (_, {headers}) => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (networkError) console.error(networkError);
  if (graphQLErrors) graphQLErrors.map(({message}) => console.error(message));
});

const apolloClient = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: split(
    ({query}) => {
      console.log({query});
      const def = getMainDefinition(query);
      return (
        def.kind === 'OperationDefinition' && def.operation === 'subscription'
      );
    },
    wsLink,
    split(
      operation => {
        console.log({
          query: operation.query,
          serverType: operation.getContext().serverType,
        });
        return operation.getContext().serverType === 'SERVER_ONE';
      },
      ApolloLink.from([errorLink, authLink, httpLink]),
      httpLinkServerTwo,
    ),
  ),
  cache: new InMemoryCache(),
});

export default apolloClient;
