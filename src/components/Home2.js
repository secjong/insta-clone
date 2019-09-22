import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

// 사용자정의모듈
import utils from "../commons/utils";
import { HOME_PAGE } from "../queries";

/**
 * 피드목록컴포넌트
 * @method
 */
const Home = () => {

    const { loading, error, data, refetch, networkStatus } = useQuery(
        HOME_PAGE,
        {
          variables: {  },
          notifyOnNetworkStatusChange: true,
        },
      );
      console.log(networkStatus);
    
      if (networkStatus === 4) return <Text>Refetching!</Text>;
      if (loading) return <Text>ddd</Text>;
      if (error) return <Text>Error!</Text>;
    
      return (
        <View><Text>성공</Text></View>
      );


    // const { loading, error, data } = useQuery(HOME_PAGE);

    // console.log(loading);

    // if (loading) return <View><Text>Loading...</Text></View>;
    // if (error) return <View><Text>`Error! ${error.message}`</Text></View>;
  
    // return (
    //   <View><Text>성공</Text></View>
    // );
    
}

export default Home;


    
        
        
