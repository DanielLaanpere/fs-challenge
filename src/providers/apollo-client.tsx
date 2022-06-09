import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const AUTH_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcwLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNjU0NzU5MzU0LCJleHAiOjE2NTUzNjQxNTR9.i1f693jqnE4aHGRAQtmIu_wySwogAqust8O3AgyHUZi7Ok66KMd65UcVXDgfuu0mwTKaPF6ImSUhSQH7jGes2mdRoOvT7bDu4hYsZeoXSqoRv5dzd98m9AVmO-x1Mu06HaT9XdU1O01py246qDXzR0m1oXgz_XELbdlo0Z9iJbQwzfZ3DCikzXlfaudzMs9KTN0JWLr6S8wqLvxugvPiBLwWRUCw6NxOeElqdBxCyLFu6RnEzaVBrC4urRP7yvxPznO-z8zfTFjIBvAjCRHx1-ajVdvYEbpSO5w2E0-3Cdda0XoztVzRgmDbB9zXvD0gnafKOg1Wmj7zba-btq7eAA';

const client = new ApolloClient({
  uri: 'https://api-dev.foodstyles.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

export const Apollo: React.FC = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
