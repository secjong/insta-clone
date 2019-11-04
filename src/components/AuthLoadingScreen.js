import React, { useState, useEffect } from 'react';
import { ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View } from 'react-native';

// 사용자정의모듈
import utils from "../commons/utils";
import styles from "../commons/styles";

/**
 * 로그인컴포넌트
 * @method
 */
export default (props) => {

    useEffect(() => {
        _bootstrapAsync();
        // 함수를 반환하면 함수의 내용이 unmount 되기 직전에 실행된다.
        return () => {

        };
    });

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        alert(userToken);

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    return (
        <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
    );
}

