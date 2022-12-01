import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, InteractionManager } from 'react-native';
import { FlatList } from 'react-native-web';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';
import Loader from '../components/Loader'

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading:true,
            uri:'',
            users: [],
            description:[],
            userActivo:{},
            posts:[],
            likes:[],
            comments:[],
		};
	}

	componentDidMount() {
		db.collection('posts').onSnapshot(
			docs => {
			let posts = [];
			docs.forEach( doc => {
				/* let user = doc.data(); */
				posts.push({ 
					id: doc.id, 
					data: doc.data() 
				});
			
			});
			this.setState({ 
				posts: posts,
				loading: false
			});
		});
	}

	render() {
		return (
			this.state.loading? <Loader/> :
			<>
				{/* Creamos el contenedor scrolleable */}
				<FlatList 
					/* Array de datos a recorrer */
					data={this.state.posts}
					/* Le da un indicador unico a cada elemento del array */
					keyExtractor={ post => post.id}
					/* Componente que renderiza con cada iteracion */
					renderItem={({item})=> <Post post={item}{...this.props}/>}
				/>
			</>
		);
	}
	}
	const styles = StyleSheet.create({
		title: {
			fontSize: 18,
			fontWeight: 30000,
		},
		
	});




export default Home;
