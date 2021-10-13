import axios from 'axios';
import { API_HEADER_RAJAONGKIR, API_WEATHER, URL_RAJAONGKIR, URL_WEATHER } from './constants';

export const getProvinsi = async () => {

    const res = await axios({
        method: 'GET',
        url: URL_RAJAONGKIR + 'province',
        headers: API_HEADER_RAJAONGKIR
    })
    const data = res.data.rajaongkir.results
    return data
}

export const getKota = async () => {

    const res = await axios({
        method: 'GET',
        url: URL_RAJAONGKIR + 'city',
        headers: API_HEADER_RAJAONGKIR
    })
    const data = res.data.rajaongkir.results
    return data
}

export const getCuaca = async ({ route }) => {

    const { selectedKota } = route.params;

    const res = await axios.get(`http://${URL_WEATHER}${selectedKota},ID&appid=${API_WEATHER}`)

    const data = res.data
    console.log(data)
    return data
}