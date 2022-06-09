import gql from 'graphql-tag';

export const MUTATION_CREATE_CARD = gql`
  mutation CreateCard($data: CardInput!) {
    createCard(data: $data) {
      id
      name
    }
  }
`;
