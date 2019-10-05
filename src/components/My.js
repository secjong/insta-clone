import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';

// 사용자정의모듈
import utils from "../commons/utils";

/**
 * 내게시물컴포넌트
 * @method
 */
export default (props) => {

    useEffect(() => {
        // 함수를 반환하면 함수의 내용이 unmount 되기 직전에 실행된다.
        return () => {

        };
    });

    return (
        <View>
            <Text>내게시물 입니다.</Text>
        </View>
    );
}

