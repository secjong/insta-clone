import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Home from "../components/Home";
import Search from "../components/Search";
import Camera from "../components/Camera";
import Activity from "../components/Activity";
import My from "../components/My";
import Login from "../components/Login";
import Join from "../components/Join";
import AuthLoadingScreen from "../components/AuthLoadingScreen";





/**
 * Home 컴포넌트에 만든 네비
 */
const homeStackNavigator = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                title: "홈",
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return (
                        <React.Fragment>
                            <Image
                                style={{width: 50, height: 50}}
                                source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
                            />
                        </React.Fragment>
                    );
                },
                showIcon: true
            }
        }
    }
);

/**
 * Search 컴포넌트에 만든 네비
 */
const searchStackNavigator = createStackNavigator(
    {
        Search: {
            screen: Search,
            navigationOptions: () => ({
                title: `검색`,
            }),
        },
    },
);

/**
 * Camera 컴포넌트에 만든 네비
 */
const cameraStackNavigator = createStackNavigator(
    {
        Camera: {
            screen: Camera,
            navigationOptions: () => ({
                title: `카메라`,
            }),
        },
    }
);

/**
 * Activity 컴포넌트에 만든 네비
 */
const activityStackNavigator = createStackNavigator(
    {
        Activity: {
            screen: Activity,
            navigationOptions: () => ({
                title: `활동`,
            }),
        },
    }
);

/**
 * My 컴포넌트에 만든 네비
 */
const MyStackNavigator = createStackNavigator(
    {
        My: {
            screen: My,
            navigationOptions: () => ({
                title: `내게시글`,
            }),
        },
    }
);





/**
 * materialTopTabNavigator + stackNavigator 방식
 * 모든 컴포넌트를 포함한 탭네비게이터 완성
 */
const materialTopTabNavigator = createMaterialTopTabNavigator(
    {
        Home: {
            screen: homeStackNavigator,
        },
        Search: {
            screen: searchStackNavigator,
        },
        Camera: {
            screen: cameraStackNavigator
        },
        Activity: {
            screen: activityStackNavigator
        },
        My: {
            screen: MyStackNavigator
        }
    }, 
    {
        initialRouteName: 'Home',
        animationEnabled: true,
        swipeEnabled: true,
        tabBarPosition: "bottom",
        tabBarOptions: {
            style: {
                backgroundColor: '#eee'
            },
            showIcon: true,
            iconStyle: {
                height: 50
            },
            activeTintColor: '#000',
            inactiveTintColor: '#444',
            upperCaseLabel: false,
            showLabel: true,
            pressColor: 'red',
            indicatorStyle: {
                height: 50,
                backgroundColor: '#ffc8c9',
            }
        }
    }
);

/**
 * switchNavigator + materialTopTabNavigator + stackNavigator 방식
 * 인증처리를 위해 switchNavigator로 감싸기
 */
// const AppStack = createStackNavigator({ Home: materialTopTabNavigator, Search: materialTopTabNavigator, Camera: materialTopTabNavigator, Activity: materialTopTabNavigator, My: materialTopTabNavigator });
const AppStack = materialTopTabNavigator;
const AuthStack = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: () => ({
                title: `로그인`,
            })
        }
    },
    {
        Join: {
            screen: Join,
            navigationOptions: () => ({
                title: `회원가입`,
            })
        }
    }
);
const switchNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    }, {
        initialRouteName: 'AuthLoading',
    }
)


/**
 * materialBorromTabNavigator 방식
 */
const materialBottomTabNavigator = createMaterialBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                title: "홈",
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    return (
                        <React.Fragment>
                            <Image
                                style={{width: 50, height: 50}}
                                source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
                            />
                        </React.Fragment>
                    );
                },
                showIcon: true
            }
        },
        Search: {
            screen: Search
        },
        Camera: {
            screen: Camera
        },
        Activity: {
            screen: Activity
        },
        My: {
            screen: My
        },
    },
    {   
        labeled: true,
        shifting: true,
        initialRouteName: 'Home',
        activeColor: '#f0edf6',
        inactiveColor: '#3e2465',
        barStyle: { 
            backgroundColor: '#000000',
        },
        backBehavior: 'initialRoute',
    }
);
  
export default createAppContainer(switchNavigator);