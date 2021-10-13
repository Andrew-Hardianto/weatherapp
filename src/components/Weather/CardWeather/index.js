import moment from 'moment'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { URL_WEATHER_IMAGE } from '../../../utils/constants'

const CardWeather = ({ cuaca }) => {
    // console.log('as', cuaca.weather)
    const data = cuaca && cuaca?.weather?.map(data => data)
    const d = data && data.length > 0 ? data[0] : {}
    console.log(d)
    return (
        <View style={styles.container}>
            <Text style={styles.text1}>{moment(cuaca?.dt_txt).format('DD/MM/yy')}</Text>
            <Image
                source={{ uri: `${URL_WEATHER_IMAGE}${d.icon}@2x.png` }}
                style={styles.image}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 180 }}>
                <Text style={styles.text2}>{d.main == 'Clouds' ? 'Berawan' : d.main == 'Rain' ? 'Hujan' : 'Cerah'}</Text>
                <Text style={styles.text2}>{cuaca?.main?.temp} °C</Text>
            </View>
        </View>
    )
}

export default CardWeather

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 25,
        width: 350,
        marginBottom: 10,
    },
    image: {
        height: 35,
        width: 35,
        marginRight: 20
    },
    text1: {
        fontWeight: 'bold',
        color: 'white',
        marginRight: 20
    },
    text2: {
        fontWeight: 'bold',
        color: 'white',
    },
})
