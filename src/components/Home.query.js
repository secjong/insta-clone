import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Query } from "react-apollo";

// 사용자정의모듈
import utils from "../commons/utils";
import { HOME_PAGE } from "../queries";

/**
 * 피드목록컴포넌트 - Query 태그를 사용하는 방식
 * @method
 */
const Home = () => 
    <Query query={HOME_PAGE}>
        {
            ({loading, data, error}) => {

                console.log("=============");
                console.log(loading);
                console.log(data);
                console.log(error);
                console.log("=============");

                let template = ``;
                if(loading) {template = <Text>`로딩중... ${loading}`</Text>;}
                if(error) {template = <Text>`에러발생 : ${error}`</Text>;}
                if(data && data.people){
                    template = data.people.map((item, index) => 
                        <Text key={index}>{item.id} / {item.name}</Text>
                    )
                }
                return (<View>{template}</View>);
            }
        }
    </Query>
export default Home;


    
        
        
