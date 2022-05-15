import {ApolloProvider, gql} from '@apollo/client';
import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import apolloClient from '../utils/apollo-client';

function Home() {
  useEffect(() => {
    apolloClient
      .query({
        query: gql`
          query {
            users {
              id
            }
          }
        `,
        context: {
          serverType: 'SERVER_ONE',
        },
      })
      .then(resFromServerOne => {
        console.log({resFromServerOne});
      })
      .catch(e => {
        console.log({e});
      });
    apolloClient
      .query({
        query: gql`
          query {
            post(id: 1) {
              id
              title
              body
            }
          }
        `,
        context: {
          serverType: 'SERVER_TWO',
        },
      })
      .then(resFromServerTwo => {
        console.log({resFromServerTwo});
      })
      .catch(e => {
        console.log({e});
      });
  }, []);
  return <ApolloProvider client={apolloClient}></ApolloProvider>;
}

export default Home;
