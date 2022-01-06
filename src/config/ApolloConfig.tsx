// import axios from 'axios';
// import { buildAxiosFetch } from '@lifeomic/axios-fetch';
import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';
import { WebSocketLink } from './WebSocketLink';
import { AUTH_TOKEN } from '../constants/ApiConstant';

const httpLink = createUploadLink({
  uri: `${process.env.REACT_APP_API_BASE_URL}/graphql`,
  // fetch: buildAxiosFetch(axios, (config, input, init) => ({
  //   ...config,
  //   // onUploadProgress: init?.onUploadProgress,
  // })),
});

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const authLink = setContext((_operation, prevContext) => {
  const { headers } = prevContext;

  // const [token] = useCookies([AUTH_TOKEN]);
  const token = Cookies.get(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : undefined,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  };
});

const wsLink = new WebSocketLink({
  url: `${process.env.REACT_APP_WEBSOCKET_BASE_URL}/subscriptions`,
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};
export const client = new ApolloClient({
  link:
    process.env.NODE_ENV === 'development'
      ? errorLink.concat(authLink.concat(splitLink))
      : authLink.concat(splitLink),
  cache: new InMemoryCache(),
  defaultOptions,
});
