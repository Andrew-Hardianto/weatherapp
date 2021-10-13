import React from 'react'
import { StyleSheet, View } from 'react-native'
import CardWeather from '../CardWeather'

const ListWeather = ({ cuaca }) => {
    return (
        <View style={styles.container}>
            <CardWeather cuaca={cuaca && cuaca.length > 0 ? cuaca[0] : {}} />
            <CardWeather cuaca={cuaca && cuaca.length > 0 ? cuaca[8] : {}} />
            <CardWeather cuaca={cuaca && cuaca.length > 0 ? cuaca[16] : {}} />
            <CardWeather cuaca={cuaca && cuaca.length > 0 ? cuaca[24] : {}} />
            <CardWeather cuaca={cuaca && cuaca.length > 0 ? cuaca[32] : {}} />
        </View>
    )
}

export default ListWeather

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        backgroundColor: '#498adf',
        shadowColor: 'black',
        opacity: 0.7,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        marginTop: 10,
        padding: 20,
    }
})
