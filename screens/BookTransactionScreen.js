import React from 'react';
import {Text,TouchableOpacity,View,StyleSheet} from 'react-native';
import *as permissions from expo-permissions;
import {BarCodeScanner} from 'expo-barcode-scanner';
export default class TransactionScreen extends React.Component{
    constructor(){
        super()
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            butttonState:'normal',
        }
    }

    getCameraPermissions = async()=>{
        const {status}=await permissions.askAsync(Permissions.CAMERA)
        this.setState({
        hasCameraPermissions:status==="granted",
        butttonState:'clicked',
        scanned:false,

        })
    }

handleBarCodeScanned = async({type,data})=>{
    this.setState({
        scanned:true,
        scannedData:data,
        butttonState:'normal',
    })
}


    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions
        const scanned = this.state.scanned
        const butttonState = this.state.butttonState

        if(buttonState==="clicked" && hasCameraPermissions){
                return(
                    <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned }
                    style={StyleSheet.absoluteFillObject}/>
                )
        }
        else if(buttonState==="normal"){
            return(
                <View style={styles.container}>
                    <Text style={styles.displayText}>
                        {
                            hasCameraPermissions===true ? this.state.scannedData : "Request Camera Permissions"
                        }
                    </Text>
                    <TouchableOpacity
                    onPress={this.getCameraPermissions}
                    style={styles.scannedButton}>
                    <Text style={styles.buttonText}>Scan QR Code</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline'

    },
    scannedButton:{
        backgroundColor:'black',
        padding:10,
        margin:10,

    },
    buttonText:{
        fontSize:20,
    }
})