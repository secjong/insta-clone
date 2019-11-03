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