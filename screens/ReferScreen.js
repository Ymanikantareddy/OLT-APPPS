import React from 'react';
import { View, TouchableOpacity, Image, Linking, StyleSheet } from 'react-native';

export default class ReferScreen extends React.Component {

    openPaymentApp = async (payApp) => {
        let url = '';
        switch(payApp) {
            case 'PAYTM': 
                url = 'paytm://upi/pay?pa=7024293076@upi&pn=DK%20Bose&mc=0000&tr=123456789ABCDEFG&tn=HelloWorld&am=11&cu=INR'; 
                break;
            case 'GPAY': 
                url = 'gpay://upi/pay?pa=7024293076@upi&pn=DK%20Bose&mc=0000&tr=123456789ABCDEFG&tn=HelloWorld&am=11&cu=INR'; 
                break;
            case 'PHONEPE': 
                url = 'phonepe://upi/pay?pa=7024293076@upi&pn=DK%20Bose&mc=0000&tr=123456789ABCDEFG&tn=HelloWorld&am=11&cu=INR'; 
                break;
            default:
                console.error('Unsupported payment app:', payApp);
                return;
        }
        
        console.log('URL : ',url);
        try {
            await Linking.openURL(url);
        } catch (err) {
            console.error('ERROR : ',err);
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => this.openPaymentApp('PAYTM')}>
                        <Image source={require('../assets/paytm.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.openPaymentApp('GPAY')}>
                        <Image source={require('../assets/GooglePay.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.openPaymentApp('PHONEPE')}>
                        <Image source={require('../assets/phonePe.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.openPaymentApp('PHONEPE')}>
                        <Image source={require('../assets/greenloaction.gif')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0', // Set background color to light gray
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 30,
        backgroundColor: '#ffffff', // Set background color to white
        shadowColor: '#000',
        margin:15,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    icon: {
        width: 50,
        height: 50,
        marginHorizontal: 10,
    },
});
