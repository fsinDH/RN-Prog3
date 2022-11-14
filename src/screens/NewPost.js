import React, { Component } from 'react';
import { db , auth } from '../firebase/config'
import { View, Text, TextInput, TouchableOpacity, } from 'react-native';
import firebase from 'firebase';
import Loader from '../components/Loader'
import MyCamera from '../components/Camera'
import { Camera } from 'expo-camera'


class NewPost extends Component {
    constructor(props){
        super(props)
        this.state={
            userActivo:{},
            bio:'',
            likes:[],
            comments:[],
            uri:'',
            showCamera:true,
            loading:true,
        }
    }
    componentDidMount(){
        db.collection('users').onSnapshot(docs=>{
            docs.forEach(doc=>{
                if(auth.currentUser.email === doc.data().email){
                    this.setState({
                        userActivo: {
                            id:doc.id, 
                            data: doc.data(),
                        }})
                }
            
                console.log(this.state.userActivo)
                this.setState({
                    loading:false
                })
            
            })
        })
    }

            
    
    crearPost(){

        db.collection('users').doc(this.state.userActivo.id).update({
                
            posts: firebase.firestore.FieldValue.arrayUnion(this.state.bio)
        
            })
            .catch(err=>console.log(err))

        db.collection('posts')
        .add({
            owner: auth.currentUser.displayName,
            bio: this.state.bio,
            createdAt: Date.now(),
            uri:this.state.uri,
            likes:[],
            comments:[],
        })
        .then((res)=>{
            console.log('posteo exitoso')
            this.setState({
                description:'',
                showCamera: true
            },()=>this.props.navigation.navigate('Home')
            )
        })
    }
    
    onImageUpload(uri){
        this.setState({
            uri:uri,
            showCamera:false
        })
    }

    render(){
        return(
        
            this.state.loading? <Loader/> :
            <View>
                {this.state.showCamera?
                <MyCamera onImageUpload = {uri=>this.onImageUpload(uri)}/>
                :
            <View>
            <Text><strong>Agregar Posteo</strong></Text>

                <TextInput 
                    placeholder='Descipcion del post...'
                    onChangeText={(bio)=>{this.setState({bio:bio})}}
                    value={this.state.bio}
                ></TextInput>

            <TouchableOpacity onPress={()=>{this.crearPost()}}>
                <Text>Crear Posteo</Text>
            </TouchableOpacity>
            </View>
    }
     </View>
      )
}}

export default NewPost;

