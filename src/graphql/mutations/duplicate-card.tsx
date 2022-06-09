import gql from 'graphql-tag';

export const MUTATION_DUPLICATE_CARD = gql`
  mutation DuplicateCard($id: ID!) {
    duplicateCard(id: $id) {
      id
      name
    }
  }
`;
