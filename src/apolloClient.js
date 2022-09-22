import { ApolloClient,createHttpLink, InMemoryCache } from '@apollo/client';
import TokenService from "./services/token.service";
import { setContext } from '@apollo/client/link/context';

const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = TokenService.getLocalAccessToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }
});


const clientState = {
  defaults: {
    feedFilter: {
      __typename: 'FeedFilter',
      type: null,
      tag: null
    }
  },
  resolvers: {
    Mutation: {
      changeFeedFilter: (_, { type, tag = null }, { cache }) => {
        const feedFilter = { __typename: 'FeedFilter', type, tag }
        cache.writeData({ data: { feedFilter } })
        return feedFilter
      }
    }
  }
}

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  link: authLink.concat(httpLink),
  clientState,
  cache: new InMemoryCache()
})

export default client