import gql from 'graphql-tag';

export const MUTATION_DELETE_CARD = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard(id: $id)
  }
`;
