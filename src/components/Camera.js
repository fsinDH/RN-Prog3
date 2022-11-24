import React, { Component } from 'react'
import {Camera} from 'expo-camera'

import {
    View,
    Text, 
    TouchableOpacity,
    StyleSheet,
    Image,
    unstable_enableLogBox
} from 'react-native'

import {storage} from '../firebase/config'
import Icon from 'react-native-vector-icons/AntDesign';

export default class MyCamera extends Component {

    constructor(props){
        super(props)
        this.state = {
            permission: false,
            showCamera: true,
            uri: ""
        }
        this.metodosDeCamara = ''
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then( ()=> this.setState({
            permission: true
        }))
       

    }

    tomarFoto(){
        console.log("Tomar Foto")
        this.metodosDeCamara.takePictureAsync()
            .then( photo => this.setState({
                uri: photo.uri,
                showCamera: false
            }))
            .catch (error => console.log(error))
    }

    guardarFoto(){
        console.log("Guardar Foto")
        fetch(this.state.uri)
            .then( res => res.blob())
            .then( image => {
                const ref = storage.ref(`photo/${Date.now()}.jpg`)
                ref.put(image)
                    .then(()=>{
                        ref.getDownloadURL()
                        .then((uri)=> {
                            this.props.onImageUpload(uri)  // viene del componente padre
                        })
                    })
            })
            .catch(err => console.log(err))
    }

    clearFoto(){
        console.log("Guardar Foto")
        this.setState({
            uri: '',
            showCamera: true
        })
    }


  render() {
    return (
        <View style={styles.container}>
            {
                this.state.permission ? 
                    this.state.showCamera ?
                        <View>
                            <Camera 
                                style={styles.cameraBody}
                                type={Camera.Constants.Type.back}
                                ref= {(metodosDeCamara) => this.metodosDeCamara = metodosDeCamara} 
                            />
                            <TouchableOpacity 
                                style={styles.button}
                                onPress = { ()=>this.tomarFoto()}
                            >
                                <Icon
										name= "camerao"
										size={30}
										color= "black"
									/>
                            </TouchableOpacity>
                        </View>

                        :
                        <View>
                            {/* Vista previa de la imagen */}
                            <Image 
                                    style={styles.preview}
                                    source={{uri:this.state.uri}}
                
                                />
                            <View>
                                {/* Guardar fotor */}
                                <TouchableOpacity 
                                    style={styles.previewButton}
                                    onPress={()=>this.guardarFoto()}
                                >
                                    <Text>Guardar Foto</Text>
                                </TouchableOpacity>
                                {/* Rechazar foto */}
                                <TouchableOpacity 
                                    style={styles.previewButton}
                                    onPress={()=>this.clearFoto()}
                                >
                                    <Text>Eliminar</Text>
                                </TouchableOpacity>
                            </View> 
                        </View>
                        : 
                        
                        <Text>No Hay permisos para la camara</Text>
            }
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        height: 300,
    },
    cameraBody: {
            flex: 1,
			width: "90%",
            height: "90%",
			justifyContent: "center",
			margin: "21px",
			marginTop: 15,
			borderRadius: 5,
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 2,
			shadowRadius: 20,
			elevation: 18,
			boxSizing: "unset",
            position: "absolute",

    },
    button:{
        height: '20%',
        marginTop: 337,
        justifyContent: "center",
        alignItems: "center"
    },
    preview:{
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: "300%",
        width: "100%"

    },
    previewButton: {
        padding:8,
        marginVertical:10,
        marginHorizontal:16,
    }
    
}) 
