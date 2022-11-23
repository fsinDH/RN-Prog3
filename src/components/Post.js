import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase'; 

import Icon from 'react-native-vector-icons/AntDesign';


class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cantidadDeLikes: this.props.post.data.likes.length,
			myLike: false,
			comments: []
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

	render() {
		return (

			<View style={styles.separator}>
				<Image style={styles.postPicture}
					source={{uri:this.props.post.data.uri}}
				/>
				<View style={styles.like}>
						{this.state.myLike ? (
								<TouchableOpacity onPress={() => this.unLike()}>
									<Icon
										name= "heart"
										size={20}
										color= "red"
										padding-right= {5}
									/>
								</TouchableOpacity>
							) : (
								<TouchableOpacity onPress={() => this.like()}>
									<Icon
										name= "hearto"
										size={20}
										color= "black"
									/>
								</TouchableOpacity>
							)}
							<Text style={styles.cantLikes}>{this.state.cantidadDeLikes}</Text>
				</View>	
				<View style={styles.inlineNear}>
						<Text><strong>{this.props.post.data.owner}</strong></Text> 
						<Text style={styles.text}>{this.props.post.data.bio} </Text>
				</View>
				{
					this.props.post.data.owner == auth.currentUser.email ? (
					<TouchableOpacity onPress={() => this.deletePost(this.props.post.data.id)}>
						<Icon
							name= "delete"
							size={20}
							color= "red"
						/>
					</TouchableOpacity>
					) : (
						null 
					)
				}

				{!this.props.post.data.comments.length?
				
               <TouchableOpacity
			   onPress={()=>{this.props.navigation.navigate('Comments', {id: this.props.post.id})}}
			   >
				<Text style={styles.text} >No hay comentarios</Text>
			   </TouchableOpacity> 
			   

			   : this.props.post.data.comments.length == 1?     
			   
			   <TouchableOpacity 
				   onPress={()=>{this.props.navigation.navigate('Comments', {id: this.props.post.id})}}
			   >
			   <Text style={styles.text}>Ver el comentario</Text> 
			   </TouchableOpacity>
   
			   :
			   <TouchableOpacity 
				   onPress={()=>{this.props.navigation.navigate('Comments', {id: this.props.post.id})}}
			   >
			   <Text style={styles.text} >Ver los {this.props.post.data.comments.length} comentarios</Text>
			   </TouchableOpacity>
			   }    
			</View>
		);
	}

	

	}
	const styles = StyleSheet.create({
		separator: {
			flex: 1,
			width: "90%",
			justifyContent: "center",
			padding: 10,
			margin: "auto",
			marginTop: 15,
			borderRadius: 5,
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.48,
			shadowRadius: 20,
			elevation: 18,
			boxSizing: "unset"
			
		},
		postPicture: {
			marginTop: 15,
			height: 300,
			width: "100%",
		},
		like: {
			flexWrap: "wrap",
			alignItems: "center",
			flexDirection: "row",
			justifyContent: "start",
			margin: 5,
		},
		inline: {
			flexWrap: "wrap",
			alignItems: "center",
			flexDirection: "row",
			justifyContent: "space-between",
			margin: 5,
		},
		inlineNear: {
			flexWrap: "wrap",
			alignItems: "center",
			flexDirection: "row",
			justifyContent: "flex-start",
		},
		text: {
			color: "dark-grey",
			textAlign: "start",
			padding: 5,
		},
		cantLikes: {
			padding: 3,
			fontSize: 17,
			fontWeight: 600
		}
		
	});
	


export default Post;


