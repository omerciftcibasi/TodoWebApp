/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { Observable } from '@apollo/client/utilities';
import { GraphQLError } from 'graphql';
import TokenService from './services/token.service';
import mutations from './graphql/mutations';

const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL;

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

function isRefreshRequest(operation) {
  return operation && operation.operationName === 'refreshToken';
}

function returnTokenDependingOnOperation(operation) {
  if (isRefreshRequest(operation)) {
    return TokenService.getLocalRefreshToken();
  }
  return TokenService.getLocalAccessToken();
}

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = returnTokenDependingOnOperation();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  };
});

const errorLink = onError(
  ({
    graphQLErrors, networkError, operation, forward
  }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            // ignore 401 error for a refresh request
            if (operation.operationName === 'refreshAccessToken' || operation.operationName === 'login' || operation.operationName === 'signUp') return;

            const observable = new Observable(
              (observer) => {
                // used an annonymous function for using an async function
                (async () => {
                  try {
                    // eslint-disable-next-line no-use-before-define
                    await refreshAccessToken();
                    if (!TokenService.getLocalAccessToken()) {
                      throw new GraphQLError('Empty AccessToken');
                    }

                    // Retry the failed request
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    };

                    forward(operation).subscribe(subscriber);
                  // eslint-disable-next-line no-shadow
                  } catch (err) {
                    observer.error(err);
                  }
                })();
              }
            );

            // eslint-disable-next-line consistent-return
            return observable;
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

const clientState = {
  defaults: {
    feedFilter: {
      __typename: 'FeedFilter',
      type: null,
      tag: null,
    },
  },
  resolvers: {
    Mutation: {
      changeFeedFilter: (_, { type, tag = null }, { cache }) => {
        const feedFilter = { __typename: 'FeedFilter', type, tag };
        cache.writeData({ data: { feedFilter } });
        return feedFilter;
      },
    },
  },
};

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  clientState,
  cache: new InMemoryCache(),
});

const refreshAccessToken = async () => {
  try {
    await client.mutate({
      mutation: mutations.refreshAccessToken,
      variables: {
        input: TokenService.getLocalRefreshToken()
      }
    }).then((response) => {
      const accessToken = response.data
        ? response.data.refreshAccessToken
        : undefined;
      TokenService.updateLocalAccessToken(accessToken);
    })
      .catch((err) => console.error(err));
  } catch (err) {
    localStorage.clear();
    throw err;
  }
};

export default client;
