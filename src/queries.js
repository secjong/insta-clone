import { gql } from "apollo-boost";
// import gql from 'graphql-tag';

export const HOME_PAGE = gql`
    query {
        listMember {
            id
            name
            age
        }
    }
`;

export const LOGIN_PAGE_LOGIN = gql`
    query login($id: String!) {
        login
    }
`;

export const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;