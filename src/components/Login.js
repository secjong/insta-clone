import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, AsyncStorage, Button } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';

// 사용자정의모듈
import { LOGIN_PAGE_LOGIN } from "../queries";

/**
 * 로그인컴포넌트
 * @method
 */
export default (props) => {
    const [ id, setId ] = useState("aaa"); // 아이디

    useEffect(() => {

        // 함수를 반환하면 함수의 내용이 unmount 되기 직전에 실행된다.
        return () => {

        };
    });

    // 로그인 쿼리 실행
    const doLogin = () => {
        let { loading, data, error } = useQuery({query: LOGIN_PAGE_LOGIN, variables: {id: id}});
        if(data){
            console.log(data);
        }
    }

    return (
        <View>
            <Text>로그인 입니다.</Text>
            <TextInput value={id} onChangeText={setId}></TextInput>
            <Button title="로그인" onPress={doLogin} />
        </View>
    );
}

