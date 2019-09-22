import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { useQuery, Query } from '@apollo/react-hooks';
import { Query } from "react-apollo";

// 사용자정의모듈
import utils from "../commons/utils";
import { HOME_PAGE } from "../queries";

/**
 * 피드목록컴포넌트
 * @method
 */
const Home = () => 
    <Query query={HOME_PAGE}>
        {
            (loading, data, error) => {
                if(loading) {
                    return <View><Text>Loading...</Text></View>;
                }
                if(error) {
                    return <View><Text>Error...</Text></View>;
                }
                if(data) {
                    console.log(data);
                    return <View>하이</View>;
                }
            }
        }
    </Query>

export default Home;


    
        
        
