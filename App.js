import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import { createStore, applyMiddleware, compose  } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";

// 사용자정의모듈
import client from "./src/apolloClient";
import Router from "./src/route";
import reducers from "./src/redux/reducers";

const storeEnhancers = compose(
  applyMiddleware(thunk)
);

const store = createStore(reducers, initialState = {}, storeEnhancers);

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
