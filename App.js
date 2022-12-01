import { StyleSheet, Text, View } from 'react-native';

import Register from './src/screens/Register';
import Login from './src/screens/Login';
import HomeMenu from './src/components/HomeMenu';
import Comments from './src/screens/Comments';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Objeto con dos componentes Navigator y Screen
const Stack = createNativeStackNavigator();

{
	/* La primera Stack.Screen va a ser la primera vista que vea el usuario */
}
export default function App() {
	return (
		<NavigationContainer> {/* contiene la estructura de la navegacion */}
			<Stack.Navigator> {/* define el tipo de navegacion y contiene a la lista de screens */}
				{/* representan a cada screen que podemos ir */}
				<Stack.Screen options={{ headerShown: false }} name="Register" component={Register} /> 
				<Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
				<Stack.Screen options={{ headerShown: false }} name="HomeMenu" component={HomeMenu} />
				<Stack.Screen options={{headerShown:true}} name='Comments' component={Comments}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
