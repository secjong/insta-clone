import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Home from "../components/Home";
import Search from "../components/Search";
import Detail from "../components/Detail";

// const stackNavigator = createStackNavigator(
//     {
//         Home: {
//             screen: Home
//         },
//         PostRegist: {
//             screen: PostRegist
//         },
//         Employee: {
//             screen: Employee
//         },
//         PostDetail : {
//             screen: PostDetail
//         }
//     }
// );

const materialTopTabNavigator = createMaterialTopTabNavigator(
    {

        Home: {
            screen: createStackNavigator(
                {
                    Home: {
                        screen: Home,
                        navigationOptions: () => ({
                            title: `홈`,
                        }),
                    },
                }
            )
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
                    Detail: {
                        screen: Detail,
                        navigationOptions: () => ({
                            title: `상세`,
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
            iconStyle: {
                height: 50
            },
            activeTintColor: '#000',
            inactiveTintColor: '#444',
            upperCaseLabel: false,
            showLabel: true,
            showIcon: false,
            pressColor: 'red',
            indicatorStyle: {
                height: 50,
                backgroundColor: '#ffc8c9',
            }
        }
    }
);

// const materialBottomTabNavigator = createMaterialBottomTabNavigator(
//     {
//         Home: {
//             screen: Home,
//             tabBarLabel: '홈'
//         },
//         Login: {
//             screen: Login
//         },
//         PostRegist: {
//             screen: PostRegist
//         }
//     },
//     {   
//         labeled: true,
//         shifting: true,
//         initialRouteName: 'Home',
//         activeColor: '#ff0f15', //#f0edf6
//         inactiveColor: '#black', //#3e2465
//         barStyle: { 
//             backgroundColor: '#ffc8c8', //#694fad 
//         },
//         backBehavior: 'initialRoute'
//     }
// );

export default createAppContainer(materialTopTabNavigator);