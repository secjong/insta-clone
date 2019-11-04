import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import { createStore, applyMiddleware, compose  } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";

// 사용자정의모듈
import client from "./src/apolloClient";
import Router from "./src/route";
import reducers from "./src/redux/reducers";
import utils from './src/commons/utils';

const storeEnhancers = compose(
  applyMiddleware(thunk)
);

const store = createStore(reducers, initialState = {}, storeEnhancers);

export default function App(props) {

  useEffect(() => {
    console.log("App 마운트!");
    console.log("App props : " , props);
    // 만약에 로그인상태가 아닌 경우 로그인 컴포넌트로 간다!
    // let obj = {
    //   method: "POST",
    //   path: "/checkToken",
    //   payload: "",
    //   cb: (responseJson) => {
    //     if(responseJson.data === "-1"){
    //       // 토큰없는경우 로그인 페이지로 이동
    //       props.navigation.navigate("Login");
    //     }
    //   }
    // };
    // utils.doFetch(obj);
    return () => {
      console.log("App 컴포넌트 언마운트");
    };

  });

  

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ApolloProvider>
  );
}
