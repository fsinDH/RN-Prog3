import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import Loader from '../components/Loader'


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
			loading: true,
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
			/* Metodo asincronico para crear usuario */
			.createUserWithEmailAndPassword(email, pass)
			.then((res) => {
				db /* Porque queremos, en este caso agregar cosas a la base de datos */
					.collection('users') /* Metodo de db para saber en que collecion estas parado */
					.add({ /* metodo para agregar un informacion en la base de datos */
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
			this.state.loading? <Loader/> :
			<View style={styles.container}>
				<Text>Registro</Text>
				<View>
					<TextInput /* representa el campo input de un formulario */
						style={styles.field} 
						placeholder="Email" 
						keyboardType="email-address" /* formato del teclado */
						onChangeText={(text) => this.setState({ email: text })} /* funcion toma los datos y los mete en el estado */
						value={this.state.email} /* muestra lo que esta en el estado */
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

					{/* la estructura de navegacion permite usar las props en componentes hijos para usar la propiedad navigation */}
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
