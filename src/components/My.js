import React, { useState, useEffect } from 'react';
import { AsyncStorage, Text, View, TextInput, TouchableHighlight, Button, Image, KeyboardAvoidingView, Alert, FlatList, Item } from 'react-native';

// 사용자정의모듈
import { LOGIN_PAGE_LOGIN } from "../queries";
import { mapStateToProps, mapDispatchToProps } from "../redux/actions/postAction";
import utils from "../commons/utils";
import styles from '../commons/styles';

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
        <View style={styles.container}>
            <View style={styles.flexCol}>
                <View style={{flex: 2}}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <View style={{flexBasis: '5%'}}>
                            <Image></Image>
                        </View>
                        <View>
                            <View>
                                <View><Text>457</Text><Text>posts</Text></View>
                                <View><Text>762</Text><Text>followers</Text></View>
                                <View><Text>809</Text><Text>followings</Text></View>
                            </View>
                            <View>
                                <Button title="팔로우" />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{flex: 2}}><Text>내소개영역</Text></View>
                <View style={{flex: 1}}><Text>탭영역</Text></View>
                <View><Text>게시글영역</Text></View>
            </View>
        </View>
    );
}

