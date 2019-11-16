import React, { useState, useEffect } from 'react';
import { AsyncStorage, Text, View, TextInput, TouchableHighlight, Button, Image, KeyboardAvoidingView } from 'react-native';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
// import { ApolloConsumer } from 'react-apollo';

// 사용자정의모듈
import { LOGIN_PAGE_LOGIN } from "../queries";
import { mapStateToProps, mapDispatchToProps } from "../redux/actions/postAction";
import utils from "../commons/utils";
import styles from '../commons/styles';

/**
 * 로그인컴포넌트
 * @method
 */
const Login = (props) => {
    const [ id, setId ] = useState("secjong"); // 아이디
    const [ password, setPassword ] = useState(""); // 비밀번호
    // const [doLogin, { loading, error }] = useMutation(LOGIN_PAGE_LOGIN);

    const [login, { called, loading, data }] = useLazyQuery(LOGIN_PAGE_LOGIN);

    // 로그인하기
    const triggerLogin = () => {
        login({ variables: { id: id } });
    }

    // 앱의 AsyncStorage에 토큰 세팅하기
    const setToken = async (token) => {
        try {
            await AsyncStorage.setItem("token", token);
        } catch (e) {
            console.log("AsyncStorage Error: " + e.message);
        }
    }

    // 앱의 AsyncStorage에서 토큰 가져오기
    const getToken = async () => {
        try {
            let token = await AsyncStorage.getItem("token");
            return token;
        } catch (e) {
            console.log("AsyncStorage Error : " + e.message);
        }
    }

    // 토큰 출력하기
    const consoleToken = async () => {
        let token = await getToken();
        console.log(token);
    }

    // 회원가입 페이지로 이동
    const goJoinPage = () => {
        props.navigation.navigate("Join");
    }

    useEffect(() => {
        // 컴포넌트 마운트시 실행되는 내용
        // 로그인 성공시
        if(!utils.isEmpty(data) && !utils.isEmpty(data.login)){
            // token 을 저장하자!
            setToken(data.login);
            // 이동하자
            props.navigation.navigate("App");
        }
        // 함수를 반환하면 함수의 내용이 unmount 되기 직전에 실행된다. 
        return () => {

        };
    });

    
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

            <Image style={styles.image} source={require('../../assets/images/insta_logo.png')} />
            
            <TextInput style={styles.textInput} value={id} placeholder="아이디" onChangeText={setId}></TextInput>
            <TextInput style={styles.textInput} value={password} placeholder="비밀번호" onChangeText={setPassword}></TextInput>
            
            <TouchableHighlight style={styles.button}>
                <Button title="로그인" onPress={() => {triggerLogin()}} />
            </TouchableHighlight>
            
            <TouchableHighlight style={styles.button}>
                <Button title="토큰확인" onPress={() => {consoleToken()}} />
            </TouchableHighlight>

            <View style={styles.flexRow}>
                <Text>계정이 없으신가요?</Text>
                <Text style={styles.aText} onPress={() => {goJoinPage()}}>가입하기.</Text>
            </View>
            
        </KeyboardAvoidingView>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);