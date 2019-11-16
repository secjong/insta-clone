import ApolloClient from "apollo-boost";
import { AsyncStorage } from 'react-native';
import utils from "./commons/utils";


const client = new ApolloClient({
    uri: utils.getApiServer, 
    request: async (operation) => {
        let token = await AsyncStorage.getItem("token"); // 매 요청마다 토큰을 꺼내서 헤더에 붙임
        operation.setContext({
            headers: {
                "x-access-token": token ? token : ""
                // authorization: token ? `Bearer ${token}` : ''
            }
        })
    }
})

// import { ApolloClient } from 'apollo-client';
// import { createHttpLink } from 'apollo-link-http';
// import { setContext } from 'apollo-link-context';
// import { InMemoryCache } from 'apollo-cache-inmemory';

// const httpLink = createHttpLink({
//   uri: utils.getApiServer,
// });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       // authorization: token ? `Bearer ${token}` : "",
//       "x-access-token": token ? `Bearer ${token}` : "",
//     }
//   }
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// });

export default client;