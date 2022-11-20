import React from 'react'
import { FlatList } from 'react-native'
import { Text, TouchableOpacity } from 'react-native'
import { Component, View } from 'react';
import Search from '../screens/Search';


class SearchResults extends Component{ 
    constructor(props){
        super(props);
        console.log(props)
        this.state = {
            nombreUsuario: this.props.dataUser.data.nombreUsuario,
            biografia: this.props.dataUser.data.biografia,
            id: this.props.dataUser.id,
            email:this.props.dataUser.data.email
        }
    }
    
   
    render(){
        return(
       

            <> 
            <TouchableOpacity onPress= {()=>this.props.navigation.navigate("Profile",{ owner: this.state.email})}>
                <Text> nombre de usuario: {this.state.nombreUsuario}</Text>
            </TouchableOpacity>
                <Text>biografía: {this.state.biografia}</Text> 
            </>
          
           
            
           
        )
    }
   
}

export default SearchResults;