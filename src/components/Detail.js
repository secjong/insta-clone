import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

// 사용자정의모듈
import utils from "../commons/utils";
import reducer from "../reducer";

/**
 * 검색컴포넌트
 * @method
 */
export default (props) => {

    const [ value, setValue ] = useState(props.navigation.getParam("str") || '');

    const [ state, dispatch ] = useReducer(reducer, { value: '' });

    useEffect(() => {
        alert("Detail 마운트!!!");
        return () => {
            console.log("Detail 컴포넌트 언마운트");
        };
    });

    const showProps = () => {
        console.log(props);
    }

    return (
        <View>
            <Text>상세 입니다.</Text>
            <Text>{ value }</Text>
            <Text>{ state.value }</Text>
            <TouchableHighlight onPress={showProps}>
                <Text>값보기</Text>
            </TouchableHighlight>
        </View>
    );
}
