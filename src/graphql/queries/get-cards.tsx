import { gql } from '@apollo/client';

export interface CardListDto {
  id: string;
  name: string;
}

export const QUERY_GET_CARDS = gql`
  query GetCards {
    cards {
      id
      name
    }
  }
`;
