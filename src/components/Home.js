import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

// 사용자정의모듈
import utils from "../commons/utils";
import { HOME_PAGE } from "../queries";
import reducer from "../reducer";

/**
 * 피드목록컴포넌트 - useQuery 메서드를 사용하는 방식
 * @method
 */
const Home = (props) => {

  const [ value, setValue ] = useState('');

  const [ state, dispatch ] = useReducer(reducer, { value: '' });
  
  useEffect(() => {
    console.log("Home 마운트!!!");
    return () => {
      console.log("Home 컴포넌트 언마운트");
    };
  }, []);

  const onChange = (ttt) => setValue(ttt);
  const goToDetail = () => {
    alert(value);
    dispatch({type: 'SET_VALUE', value});
    // props.navigation.navigate("Search", { str: value});
    // props.navigation.navigate("Detail", { str: value});
  }



  const { loading, error, data } = useQuery(HOME_PAGE);

  let template = ``;
  if (loading) {template = <Text>`로딩중... ${loading}`</Text>;}
  if (error) {template = <Text>`에러발생 : ${error}`</Text>;}
  if (data && data.people) {
    template = data.people.map((item, index) => 
      <Text key={index}>{item.id} / {item.name}</Text>
    )
  }
  return (
    <View>
      <Text>{value}</Text>
      {template}
      <TextInput value={value} onChangeText={onChange} />
      <TouchableHighlight onPress={goToDetail}>
          <Text>등록</Text>
      </TouchableHighlight>
      <Text>state.value : {state.value}</Text>
    </View>
  );
}
export default Home;


    
        
        
