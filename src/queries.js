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
    query login($id: String!, $password: String!) {
      login(id: $id, password: $password)
    }
`;

export const JOIN_PAGE_JOIN = gql`
    mutation insertMember($id: String!, $password: String!, $name: String!, $birth: String, $gender: String, $site: String, $introduction: String) {
      insertMember(id: $id, password: $password, name: $name, birth: $birth, gender: $gender, site: $site, introduction: $introduction)
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