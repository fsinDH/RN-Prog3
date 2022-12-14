import React, { Component } from 'react'
import { db } from '../firebase/config';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Loader from '../components/Loader'

export default class Busqueda extends Component {

    constructor(props){
        super(props)
        this.state={
            busqueda:"",
            loading:true,
            users:[],
            resultados:[],
        }
    }
    componentDidMount(){
        db.collection("users").onSnapshot(docs=>{
            let usersFromDB=[]
            docs.forEach((doc)=>{
               let users= doc.data();
                usersFromDB.push({id:doc.id, data:users})
            });
            console.log(usersFromDB);
            this.setState({
                users:usersFromDB,
                loading:false
            })

            
        })
      

    
    }
    buscador(){
        if(this.state.busqueda.length > 0){
            
            let nuevoArray = this.state.users.filter((user) => {
              return  user.data.nombreUsuario.includes(this.state.busqueda)}
            )
                this.setState({
                    resultados: nuevoArray,
                
                }, () => console.log(this.state.resultados))
        
                if(this.state.resultados.length== 0) {
                this.setState({
                error: "No existe un usuario con ese nombre"
                })
                }   
        } else if(this.state.busqueda.length == 0) {
            this.setState({
                error: "Este campo no puede estar vacío"
            })
        } 
          
    }
    
    render() {
        return (
            this.state.loading? <Loader/> :
            <>
            {this.state.resultados.length > 0 ?
            <View>
                <FlatList
                data = {this.state.resultados}
                keyExtractor= {item => item.id}
                renderItem={ ({item}) => (
                    <View>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Perfil")}}>
                       <Text>{item.data.username}</Text>
                     </TouchableOpacity>
                    </View>
                    )}
                />
            </View> : <Text>{this.state.error}</Text>
            }
              <View>
                
                    <TextInput style={{}} placeholder="buscá a tus amigos"
                    onChangeText={(text) => this.setState({busqueda: text})}>
                    </TextInput>
                    <TouchableOpacity onPress = {() => this.buscador()}> 
                        <Text>buscar</Text>
                    </TouchableOpacity>
                    </View>
          <View>
            
            
    
            
            
          </View></>
        )
      }
    }