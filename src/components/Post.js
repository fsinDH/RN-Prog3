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
    

	unLike() {
        db
			.collection('posts')
			.doc(this.props.post.id)
			.update({
				likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
			})
			.then(() =>
				this.setState({
					cantidadDeLikes: this.state.cantidadDeLikes - 1,
					myLike: false,
				})
			)
			.catch((error) => console.log(error));
    }

    deletePost(id) {
        db.collection("posts").doc(id).delete()
    }

	comentar() {
        console.log("comente")
    }

	render() {
		return (
			<View style={styles.separator}>
				<Image style={styles.postPicture}
					source={{uri:this.props.post.data.uri}}
					
				/>
				<Text>Post de: {this.props.post.data.owner}</Text>
				<Text>Texto del Post: {this.props.post.data.bio} </Text>
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
				{
					this.props.post.data.owner == auth.currentUser.email ? (
					<TouchableOpacity onPress={() => this.deletePost(this.props.post.data.id)}>
						<Text>Borrar</Text>
					</TouchableOpacity>
					) : (
						null 
					)
				}
	
				<TouchableOpacity onPress={() => this.props.navigation.navigate("Comments", {id: this.props.post.data.id})}> 
					<Text>Comments</Text>
				</TouchableOpacity>
			</View>
		);
	}
	}
	const styles = StyleSheet.create({
		separator: {
			borderBottomColor: '#ddd',
			borderBottomWidth: 1,
			marginbottom: 70,
			paddingHorizontal: 20,
			padding: 13,
			border: 100
		},
		postPicture: {
			width: 383,
			height: 288
		}
	});
	


export default Post;


