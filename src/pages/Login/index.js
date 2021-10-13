import React, { useCallback, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Toast from 'react-native-toast-message';
import axios from 'axios';

import Logo from '../../assets/images/clouds.png'
import { getKota, getProvinsi } from '../../utils/api';

const Login = ({ navigation }) => {

    const [nama, setNama] = useState("");
    const [provinsi, setProvinsi] = useState([]);
    const [kota, setKota] = useState([]);
    const [selectedProvinsi, setSelectedProvinsi] = useState('')
    const [selectedKota, setSelectedKota] = useState('')

    const getProvinsiList = useCallback(async () => {
        const data = await getProvinsi()
        setProvinsi(data)
    }, [getProvinsi])

    const getKotaList = useCallback(async () => {
        const data = await getKota()
        setKota(data)
    }, [getKota])

    useEffect(() => {
        getProvinsiList()
        getKotaList()
    }, [])

    const handleSubmit = () => {
        if (!nama || !selectedProvinsi || !selectedKota) {
            Toast.show({
                type: 'error',
                text1: 'error',
                text2: 'Tolong isi semua kolom!',
                visibilityTime: 5000,
            });
        } else {
            navigation.navigate('Home', {
                nama,
                selectedKota
            })
        }
    }

    return (
        <View style={styles.page}>
            <Image
                source={Logo}
                style={styles.logo}
            />
            <Text style={styles.textHeader}>Aplikasi Cuaca</Text>
            <View style={styles.inputView}>
                <Text style={styles.text}>Nama</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Masukkan Nama"
                    placeholderTextColor="#498adf"
                    value={nama}
                    onChangeText={(value) => setNama(value)}
                />
                <Text style={styles.text}>Provinsi</Text>
                <View style={styles.wrapperPicker}>
                    <Picker
                        style={styles.picker}
                        selectedValue={selectedProvinsi}
                        onValueChange={(itemValue) => setSelectedProvinsi(itemValue)}
                    >
                        <Picker.Item label="-- Pilih Provinsi --" value="" />
                        {provinsi.map((data) => {
                            return (
                                <Picker.Item key={data.province_id} label={data.province} value={data.province_id} />
                            )
                        })}
                    </Picker>
                </View>
                <Text style={styles.text}>Kota</Text>
                <View style={styles.wrapperPicker}>
                    <Picker
                        style={styles.picker}
                        selectedValue={selectedKota}
                        onValueChange={(itemValue) => setSelectedKota(itemValue)}
                    >
                        <Picker.Item label="-- Pilih Kota --" value="" />
                        {kota.filter(data => data.province_id.includes(selectedProvinsi))
                            .map((data) => {
                                return (
                                    <Picker.Item key={data.city_id} label={data.city_name} value={data.city_name} />
                                )
                            })}
                    </Picker>
                </View>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={handleSubmit}
                >
                    <Text style={{ color: 'white' }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textHeader: {
        fontSize: 16,
        color: '#498adf',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    logo: {
        alignItems: 'center',
        marginTop: 100,
        width: 100,
        height: 100,
    },
    inputView: {
        width: "60%",
        height: 70,
        marginBottom: 10,
        alignItems: "center",
        marginTop: 30
    },
    textInput: {
        borderColor: "#498adf",
        borderWidth: 1,
        borderRadius: 10,
        width: "100%",
        height: "55%",
        color: '#498adf',
        marginBottom: 5,
        textAlignVertical: 'center'
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#498adf',
        alignSelf: "flex-start"
    },
    picker: {
        color: '#498adf',
        width: "100%",
        height: 15,
        fontSize: 14,
        marginTop: -12
    },
    wrapperPicker: {
        borderColor: "#498adf",
        borderWidth: 1,
        borderRadius: 10,
        width: "100%",
        height: "55%",
        marginBottom: 5
    },
    loginBtn: {
        width: "40%",
        borderRadius: 10,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#498adf",
        color: 'white',
        marginTop: 20
    }
})
