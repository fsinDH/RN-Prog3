import React, { Component } from 'react';
import { db , auth } from '../firebase/config'


class NewPost extends Component {
    constructor(props){
        super(props)
        this.state={
            userActivo:{},
            description:'',
            showCamera:true,
            loading:true,
            uri:'',
            likes:[],
            comments:[]
        }
    }
    crearPost(){

    }
    render(){

    }
}

export default NewPost;
