import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
/* import NewPost from '../screens/NewPost' */
import {Foundation, Entypo, FontAwesome5 } from '@expo/vector-icons'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function HomeMenu() {
	return (
		<Tab.Navigator screenOptions={{tabBarShowLabel:false}}>

			<Tab.Screen name="Home" component={Home} options={{tabBarStyle:{backgroundColor:'#FF9C33', borderTopWidth: 0},tabBarIcon: ({focused}) => (<Foundation name='home' size={30} color={focused?"black":"white"}/>), headerStyle: {backgroundColor: '#FF9C33'}, headerTintColor: '#ggg', headerTitleStyle: {fontWeight: 'bold'},}}/>

			{/* <Tab.Screen name='NewPost' component={NewPost} options= {{tabBarStyle:{backgroundColor:'#FF9C33'}, tabBarIcon: ({focused})=> (<Entypo name="camera" size={24} color={focused?"black":"white"} />) , headerStyle: {backgroundColor: '#FF9C33'}, headerTintColor: '#ggg', headerTitleStyle: {fontWeight: 'bold'},}}/> */}

			<Tab.Screen name="Profile" component={Profile} options={{tabBarStyle:{backgroundColor:'#FF9C33'} ,tabBarIcon: ({focused}) => (<FontAwesome5 name="user-alt" size={28} color={focused?"black":"white"} />), headerStyle: {backgroundColor: '#FF9C33'}, headerTintColor: '#ggg', headerTitleStyle: {fontWeight: 'bold'},}}/>
			
		</Tab.Navigator>
	);
}

export default HomeMenu;
