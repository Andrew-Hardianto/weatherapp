import React, { useCallback, useEffect, useState } from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import moment from 'moment'
import axios from 'axios';

import Foto from '../../assets/images/nature.jpg'
import ListWeather from '../../components/Weather/ListWeather';
import logo from '../../assets/images/clouds.png'
import { API_WEATHER, URL_WEATHER, URL_WEATHER_IMAGE } from '../../utils/constants';

const Home = ({ route }) => {
    const { nama, selectedKota } = route.params;

    const [cuaca, setCuaca] = useState({})

    const jam = moment(Date.now()).utcOffset('+07:00').format('hh:mm')
    const h = (new Date()).getHours()

    const getCuacaList = useCallback(async () => {
        const res = await axios.get(`http://${URL_WEATHER}Bekasi&units=metric&appid=${API_WEATHER}`)
        setCuaca(res.data.list)
    }, [])

    useEffect(() => {
        getCuacaList()
    }, [])

    // console.log('as', cuaca.length)

    // const arr = cuaca && cuaca.list.map(data => data)
    const arr = cuaca && cuaca.length > 0 ? cuaca[0] : {}

    const Weather = arr?.weather?.map(data => data.main)

    const iconI = arr?.weather?.map(data => data.icon)
    // console.log('ad', arr)

    return (
        <View style={styles.container}>
            <ImageBackground
                source={Foto}
                style={styles.image}
                resizeMode="cover"
            >
                <View style={styles.hours}>
                    <Text style={styles.jam}>{jam}</Text>
                    <Text style={styles.kota}>{selectedKota}</Text>
                </View>
                <View style={styles.card}>
                    <View style={{ alignItems: 'center', marginBottom: 5 }}>
                        <Text style={styles.textBold}>Selamat {h >= 4 && h < 11 ? 'Pagi' : h >= 11 && h < 15 ? 'Siang' : h >= 15 && h < 19 ? 'Sore' : 'Malam'} {nama}</Text>
                    </View>
                    <View style={styles.cardItem}>
                        <View>
                            <Text style={styles.textBold}>{moment(arr.dt_txt).format('DD/MM/yy')}</Text>
                            <Text style={styles.textBold}>{arr && arr?.main?.temp} °C</Text>
                            <Text style={styles.textBold}>{Weather == 'Clouds' ? 'Berawan' : Weather == 'Rain' ? 'Hujan' : 'Cerah'}</Text>
                        </View>
                        <Image
                            source={{ uri: `${URL_WEATHER_IMAGE}${iconI}@2x.png` }}
                            style={styles.logo}
                        />
                    </View>
                </View>
                <View style={styles.pages}>
                    <ListWeather cuaca={cuaca} />
                </View>
            </ImageBackground>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        alignItems: 'center',
    },
    pages: {
        padding: 40
    },
    hours: {
        marginTop: 150,
        alignItems: 'center'
    },
    card: {
        borderRadius: 20,
        backgroundColor: '#498adf',
        opacity: 0.6,
        marginTop: 30,
        padding: 20,
        width: 370
    },
    cardItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logo: {
        width: 100,
        height: 100
    },
    jam: {
        fontSize: 48,
        fontWeight: 'bold'
    },
    kota: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    textBold: {
        fontWeight: 'bold',
        color: 'white'
    }
})
