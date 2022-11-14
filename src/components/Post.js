import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';


class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cantidadDeLikes: this.props.post.data.likes.length,
			myLike: false,
		};
	}

	componentDidMount() {
		if (this.props.post.data.likes.includes(auth.currentUser.email)) {
			this.setState({
				myLike: true,
			});
		}
	}

	like() {
		//Agregar el email del user logueado en el array
		db
			.collection('posts')
			.doc(this.props.post.id)
			.update({
				likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
			})
			.then(() =>
				this.setState({
					cantidadDeLikes: this.state.cantidadDeLikes + 1,
					myLike: true,
				})
			)
			.catch((error) => console.log(error));
	}

	unLike() {}

	render() {
		return (
			<View>
				<Text>Post de: {this.props.post.data.owner}</Text>
				<Text>Texto del Post: {this.props.post.data.description}</Text>
				<Image></Image>
				<Text>Cantidad de likes: {this.state.cantidadDeLikes}</Text>
				{this.state.myLike ? (
					<TouchableOpacity onPress={() => this.unLike()}>
						<Text>Quitar Like</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={() => this.like()}>
						<Text>Like</Text>
					</TouchableOpacity>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	separator: {
		borderBottomColor: '#ddd',
		borderBottomWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 20,
	},
});

export default Post;
