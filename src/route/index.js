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

const stackNavigator = createStackNavigator(
    {
        Home: {
            screen: Home
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
    }
);

const materialTopTabNavigator = createMaterialTopTabNavigator(
    {
        Home: {
            screen: createStackNavigator(
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
                }
            ),
        },
        Search: {
            screen: createStackNavigator(
                {
                    Search: {
                        screen: Search,
                        navigationOptions: () => ({
                            title: `검색`,
                        }),
                    },
                },
            ),
        },
        Camera: {
            screen: createStackNavigator(
                {
                    Camera: {
                        screen: Camera,
                        navigationOptions: () => ({
                            title: `카메라`,
                        }),
                    },
                }
            )
        },
        Activity: {
            screen: createStackNavigator(
                {
                    Activity: {
                        screen: Activity,
                        navigationOptions: () => ({
                            title: `활동`,
                        }),
                    },
                }
            )
        },
        My: {
            screen: createStackNavigator(
                {
                    My: {
                        screen: My,
                        navigationOptions: () => ({
                            title: `내게시글`,
                        }),
                    },
                }
            )
        },
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
  
export default createAppContainer(materialTopTabNavigator);