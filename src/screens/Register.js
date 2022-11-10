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
			imageUser: '',
			bio: '',
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

	
	registerUser(email, pass, nombreUsuario, imageUser, bio) {

		// Chequeando que los campos no esten vacios
		if (this.state.email === "" || this.state.pass === "" || this.state.nombreUsuario === '' || this.state.bio === '' ) {	
			this.setState({mensajeError: "Todas las casillas deben ser llenadas"})
			return
		} 
		
		// Al registrar un user, queremos guardarlo en la db con email, nombre, biografia e imagen.
		auth
			.createUserWithEmailAndPassword(email, pass)
			.then((res) => {
				db
					.collection('users')
					.add({
						email: email,
						nombreUsuario: nombreUsuario,
						imageUser: imageUser,
						bio: bio,
					})
					.then((res) => {
						this.setState({
							email: '',
							pass: '',
							nombreUsuario: '',
							imageUser: '',
							bio: ''
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
						placeholder="User Name"
						keyboardType="default"
						onChangeText={(text) => this.setState({ nombreUsuario: text })}
						value={this.state.nombreUsuario}
					/>
					<TextInput 
						style={styles.field} 
						placeholder="Password" 
						keyboardType="default" 
						secureTextEntry 
						onChangeText={(text) => this.setState({ pass: text })} 
						value={this.state.pass} 
					/>
					<TouchableOpacity onPress={() => (this.state.imageUser)}> 
						<Text>Image User </Text>
					</TouchableOpacity>
					<TextInput 
						style={styles.field} 
						placeholder="Description" 
						keyboardType="default" 
						onChangeText={(text) => this.setState({ bio: text })} 
						value={this.state.bio} 
					/>
					{/* Muestra el estado de "mensajeError" */}
					<Text>{this.state.mensajeError}</Text>

					<Text onPress={() => this.props.navigation.navigate('Login')}>Login</Text>

					<TouchableOpacity onPress={() => this.registerUser(this.state.email, this.state.pass, this.state.nombreUsuario, this.state.imageUser, this.state.bio)}>
						<Text>Sing Up</Text>
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
