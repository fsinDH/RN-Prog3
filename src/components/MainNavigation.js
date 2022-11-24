import React, { Component } from 'react';

//Importar contenedor y el tipo de menu
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Guardar la ejecución de Stack
const Stack = createNativeStackNavigator();

//importar las screens que seran parte del menu
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';


class MainNavigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			registerError: '',
		};
	}

	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
					<Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
					<Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

export default MainNavigation;