import React from 'react'
import { ActivityIndicator } from 'react-native'

export default function Loader() {
    return (
        <div>
            <ActivityIndicator
            size="large"
            color="green"
            style={{
                position:"absolute",
                alignItems:"center",
                left:0,
                right:0,
                top:0,
                bottom:0,
            }}
            >
            </ActivityIndicator>
        </div>
    )
}