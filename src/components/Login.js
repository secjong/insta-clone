import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, AsyncStorage, Button } from 'react-native';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
// import { ApolloConsumer } from 'react-apollo';

// 사용자정의모듈
import { LOGIN_PAGE_LOGIN } from "../queries";
import { mapStateToProps, mapDispatchToProps } from "../redux/actions/postAction";
import utils from "../commons/utils";

/**
 * 로그인컴포넌트
 * @method
 */
const Login = (props) => {
    const [ id, setId ] = useState("secjong123123"); // 아이디
    // const [doLogin, { loading, error }] = useMutation(LOGIN_PAGE_LOGIN);
    const [login, { called, loading, data }] = useLazyQuery(LOGIN_PAGE_LOGIN);

    const triggerLogin = () => {
        login({ variables: { id: id } });
    }

    const setToken = async (token) => {
        try {
            await AsyncStorage.setItem("token", token);
        } catch (e) {
            console.log('AsyncStorage Error: ' + e.message);
        }
    }

    const getToken = async () => {
        try {
            let token = await AsyncStorage.getItem("token");
            return token;
        } catch (e) {
            console.log('AsyncStorage Error: ' + e.message);
        }
    }

    const consoleToken = async () => {
        let token = await getToken();
        console.log(token);
    }

    useEffect(() => {
        // 함수를 반환하면 함수의 내용이 unmount 되기 직전에 실행된다. 
        return () => {

        };
    });

    // 로그인 성공시
    if(!utils.isEmpty(data) && !utils.isEmpty(data.login)){
        // token 을 저장하자!
        setToken(data.login);
        // 이동하자
        props.navigation.navigate('App');
    }

    return (
        <View>
            <Text>로그인 입니다.</Text>
            <TextInput value={id} onChangeText={setId}></TextInput>
            <Button title="로그인" onPress={() => {triggerLogin()}} />
            <Button title="토큰확인" onPress={() => {consoleToken()}} />
        </View>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);