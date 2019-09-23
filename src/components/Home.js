import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';

// 사용자정의모듈
import utils from "../commons/utils";
import { HOME_PAGE } from "../queries";
import { mapStateToProps, mapDispatchToProps } from "../redux/actions/postAction";

/**
 * 피드목록컴포넌트 - useQuery 메서드를 사용하는 방식
 * @method
 */
const Home = (props) => {

  const [ userName, setUserName ] = useState('홍길동');
  const { loading, data, error } = useQuery(HOME_PAGE);
  let template = <Text></Text>;
  if(data && data.people){
    template = data.people.map((item, index) => 
      <Text key={index}>{item.id} / {item.name}</Text>
    )
  }

  useEffect(() => {
    
    console.log("Home 마운트!");
    console.log("Home props : " , props);
    
    props.navigation.addListener("didFocus", (e) => {
      // 홈탭 클릭시 목록 다시불러오기
    });

    return () => {
      console.log("Home 컴포넌트 언마운트");
    };

  });

  // 서치탭으로 이동
  const goToSearch = () => {
    props.navigation.navigate("Search");
  }

  return (
    <View>
      
      {template}

      <Text>{userName}</Text>
      <TextInput value={userName} onChangeText={setUserName} />
      <TouchableHighlight onPress={goToSearch}>
        <Text>등록</Text>
      </TouchableHighlight>
      <Text>{props.test}</Text>
    </View>
  );

}
export default connect(mapStateToProps, mapDispatchToProps)(Home);