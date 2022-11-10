import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			pass: '',
			mensajeError: '',
		};
	}
	loginUser(email, pass) {

		// Chequeando que los campos no esten vacios
		if (this.state.email === "" || this.state.pass === "") {
			this.setState({mensajeError: "Todas las casillas deben ser llenadas"})	
			return
		} 
		
		auth
			.signInWithEmailAndPassword(email, pass)
			.then((res) => {
				this.props.navigation.navigate('HomeMenu');
			})
			.catch((error) => 
			{console.log(error) 
			this.setState({mensajeError: error.message})}
			);
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Ingresar</Text>
				<View >
					<TextInput style={styles.field} placeholder="Email" keyboardType="email-address" onChangeText={(text) => this.setState({ email: text })} value={this.state.email} />
					
					<TextInput style={styles.field} placeholder="Password" keyboardType="default" secureTextEntry onChangeText={(text) => this.setState({ pass: text })} value={this.state.pass} />
					
					<Text onPress={() => this.loginUser(this.state.email, this.state.pass)}>Login</Text>

					{/* Muestra el estado de "mensajeError" */}
					<Text>{this.state.mensajeError}</Text>

					<Text onPress={() => this.props.navigation.navigate('Register')}>Sing Up</Text>

				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	field: {},
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems:'center',
		height: '100%',
		backgroundColor: '#FF9C33'
	}
});

export default Login;
