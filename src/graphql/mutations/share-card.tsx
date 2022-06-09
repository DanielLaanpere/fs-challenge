import gql from 'graphql-tag';

export const MUTATION_SHARE_CARD = gql`
  mutation shareCard($id: ID!) {
    shareCard(id: $id)
  }
`;
