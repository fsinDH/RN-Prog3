import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, InteractionManager } from 'react-native';
import { FlatList } from 'react-native-web';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';

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
			<>
				<Text style={styles.title}> My Home </Text>
				<FlatList 
					data={this.state.posts}
					keyExtractor={ post => post.id}
					renderItem={({item})=> <Post post={item}{...this.props}/>}
				/>
			</>
		);
	}
	}
	const styles = StyleSheet.create({
		title: {
			fontSize: 18,
			fontWeight: 30000
		},
		
	});




export default Home;
