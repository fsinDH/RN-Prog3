import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, TextInput, Text, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebase/config';
import { FontAwesome } from '@expo/vector-icons';
import Loader from '../components/Loader';

export default class Search extends Component {
    constructor() {
        super()
        this.state={
            loading:true,
            users: [],
            resultados: [],
            filterBy:'',
            busqueda: false
        }
    }

    componentDidMount(){
        db.collection('users').onSnapshot(docs=>{
            let users = [];
            docs.forEach(doc=>{
            users.push( {
                id:doc.id, 
                data:doc.data()})
    
        })
            this.setState({
            users: users,
            loading:false,
            })
        })
    }
        
    filter(filtro){
        console.log(this.state.resultados)
        if (this.state.filterBy.length !== 0 ) {
            let resultadosFiltrados = this.state.users.filter((user) => {return user.data.userName.toLowerCase().includes(filtro.toLowerCase())})
            this.setState({resultados: resultadosFiltrados})
            console.log(resultadosFiltrados)  
            this.setState({
                filterBy: '',
                busqueda: true
        })   
        }else{
            this.setState({resultados:[]})
        } 
        
    }

    render (){
        return(
           
            <View>
                <TextInput
                    placeholder="Buscar usuarios"
                    keyboardType="default"
                    onChangeText={(text)=>{this.busqueda(text)}}>
                 </TextInput>
                 <TouchableOpacity onPress={()=>{this.busqueda(this.state.busqueda)}}>
                    <Text>Buscar</Text>
                </TouchableOpacity>
                
               
            {this.state.resultados.length === 0?
                 <>
                  <Text>Perfiles sugeridos</Text> 
                  
                  <FlatList
                  data={this.state.sugeridos}
                  keyExtractor={ item => item.id.toString() }
                  renderItem={ ({item}) => (
                      <View>
                      <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Perfil")}}>
                         <Text>{item.data.username}</Text>
                       </TouchableOpacity>
                      </View>
                      )}
                  />
                </>
                :  <FlatList
                data={ this.state.resultados }
                keyExtractor={ item => item.id.toString() }
                renderItem={ ({item}) => (
                    <View>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Perfil")}}>
                       <Text>{item.data.username}</Text>
                     </TouchableOpacity>
                    </View>
                    )}
                    
        />}
               
                
          
               
                       
                
            </View>
                
            )
            
            
            
    }
}


const styles = StyleSheet.create({
    campo: {
        fontSize:16,
        borderColor: '#FF9C33',
        borderWidth:1,
        borderStyle:'solid',
        borderRadius:4,
        marginVertical:8,
        marginHorizontal:16,
        padding:8,
        width:280
    },
    container2: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'center',
        marginHorizontal:6,
    },
    lupa: {
        alignSelf: 'center',
    },
    leyenda: {
        color: 'red',
        marginLeft: 38
    },
    listadoUsers: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 38,
        marginTop: 5
    },
    text: {
        fontSize: 20,
        color: 'black',
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'center'
    },
    userName: {
        fontSize: 15,
        paddingLeft: 15,
        alignSelf: 'center'
    }
})