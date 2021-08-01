import React from 'react'
import { Platform, Text } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
// import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'
// import Icon from 'react-native-vector-icons/FontAwesome'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavouritesScreen from '../screens/FavouritesScreen'
import FiltersScreen from '../screens/FiltersScreen'
import Colors from '../constants/Colors'

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitle: 'A Screen'
}
const MealsNavigator = createStackNavigator({
    Categories: { 
        screen: CategoriesScreen       
    },
    CategoryMeals: {
        screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
})
const FavNavigator = createStackNavigator({
    Favourites: FavouritesScreen,
    MealDetail: MealDetailScreen
}, 
{
    defaultNavigationOptions: defaultStackNavOptions
})

const tabScreenConfig = {
    Meals: { screen: MealsNavigator, navigationOptions: {
        tabBarIcon: (tabInfo) => {
            return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        },
        tabBarColor: Colors.primaryColor
    }
},
Favourites: { 
    screen: FavNavigator, 
    navigationOptions: {
        tabBarIcon: (tabInfo) => {
            return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
        },
        tabBarColor: Colors.accentColor,
        tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favourites</Text> : 'Favourites' 
}}
}
const MealsFavTabNavigator = Platform.OS === 'android' 
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true,
        barStyle: {
            backgroundColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
        }
    }) 
    : createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        labelStyle: {
            fontFamily: 'open-sans-bold'
        },
        activeTintColor: Colors.accentColor
    }
})

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, 
{
    // navigationOptions: {
    //     drawerLabel: "Filters!!!"
    // },
    defaultNavigationOptions: defaultStackNavOptions
})
const MainNavigator = createDrawerNavigator({
    MealsFavs:  {
        screen:  MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        },
    },
    Filters: FiltersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
})

export default createAppContainer(MainNavigator)
