import React, { useState, useEffect } from 'react';
import { AsyncStorage, Text, View, TextInput, TouchableHighlight, Button, Image, KeyboardAvoidingView, Alert } from 'react-native';
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
    
    // const [login, { data, loading, error, called }] = useMutation(LOGIN_PAGE_LOGIN);

    const [login, { called, loading, data }] = useLazyQuery(LOGIN_PAGE_LOGIN);

    let idElem = null; // 아이디입력란
    let passwordElem = null; // 패스워드입력란

    useEffect(() => {
        // 컴포넌트 마운트시 실행되는 내용

        console.log("called : " , called);
        console.log("loading : " , loading);
        console.log("data : " , data);

        // 로그인 성공시
        if(!utils.isEmpty(data) && !utils.isEmpty(data.login)){
            // token 을 저장하자!
            setToken(data.login);
            // 이동하자
            props.navigation.navigate("App");
        }

        if(called && !utils.isEmpty(data) && utils.isEmpty(data.login)){
            Alert.alert("", "일치하는 회원이 없습니다.", [{text: "네"}]);
        }
        
        // 함수를 반환하면 함수의 내용이 unmount 되기 직전에 실행된다. 
        return () => {

        };
    });

    // 로그인하기
    const triggerLogin = () => {
        // 유효성 검사
        let isValid = checkValidData();
        if(!isValid){
            return false;
        }
        const data = {
            id, password
        }
        login({ variables: data });
    }

    // 입력값 유효성검사
    const checkValidData = () => {
        // 아이디 체크
        if(utils.isEmpty(id)){
            Alert.alert("", "아이디를 입력하세요.", [{text: "네"}]);
            idElem.focus();
            return false;
        }
        // 비밀번호 체크
        if(utils.isEmpty(password)){
            Alert.alert("", "비밀번호를 입력하세요.", [{text: "네"}]);
            passwordElem.focus();
            return false;
        }
        return true;
    }

    // 앱의 AsyncStorage에 토큰 세팅하기
    const setToken = async (token) => {
        try {
            await AsyncStorage.setItem("token", token);
        } catch (e) {
            console.log("AsyncStorage Error: " + e.message);
        }
    }

    // 회원가입 페이지로 이동
    const goJoinPage = () => {
        props.navigation.navigate("Join");
    }

    // 토큰 출력하기
    const consoleToken = async () => {
        let token = await getToken();
        console.log(token);
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



    
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

            <Image style={styles.image} source={require('../../assets/images/insta_logo.png')} />
            
            <TextInput style={styles.textInput} value={id} placeholder="아이디" onChangeText={setId} autoCapitalize={"none"} ref={(elem) => {idElem = elem}}></TextInput>
            <TextInput style={styles.textInput} value={password} placeholder="비밀번호" onChangeText={setPassword} autoCapitalize={"none"} ref={(elem) => {passwordElem = elem}}></TextInput>
            
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