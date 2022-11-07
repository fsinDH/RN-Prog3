import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';


class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			pass: '',
			nombreUsuario: '',
			mensajeError: '',
		};
	}

	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.props.navigation.navigate('HomeMenu');
			}
		});
	}
	//Al registrar un user, queremos guardarlo en la db con nombre,biografia.

	registerUser(email, pass, nombreUsuario) {
		auth
			.createUserWithEmailAndPassword(email, pass)
			.then((res) => {
				db
					.collection('users')
					.add({
						email: email,
						nombreUsuario: nombreUsuario,
					})
					.then((res) => {
						this.setState({
							email: '',
							pass: '',
						});
						this.props.navigation.navigate('HomeMenu');
					});
			})
			.catch((error) => 
			{console.log(error) 
			this.setState({mensajeError: error.message})}
			);
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Registro</Text>
				<View>
					<TextInput 
						style={styles.field} 
						placeholder="Email" 
						keyboardType="email-address" 
						onChangeText={(text) => this.setState({ email: text })} 
						value={this.state.email} 
					/>
					<TextInput
						style={styles.field}
						placeholder="Nombre de usuario"
						keyboardType="default"
						onChangeText={(text) => this.setState({ nombreUsuario: text })}
						value={this.state.nombreUsuario}
					/>
					<TextInput 
						style={styles.field} 
						placeholder="password" 
						keyboardType="default" 
						secureTextEntry 
						onChangeText={(text) => this.setState({ pass: text })} 
						value={this.state.pass} 
					/>
					{/* Muestra el estado de "mensajeError" */}
					<Text>{this.state.mensajeError}</Text>

					<Text onPress={() => this.props.navigation.navigate('Login')}>Ya tengo cuenta</Text>

					<TouchableOpacity onPress={() => this.registerUser(this.state.email, this.state.pass, this.state.nombreUsuario)}>
						<Text>Registrarme</Text>
					</TouchableOpacity>


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

export default Register;
