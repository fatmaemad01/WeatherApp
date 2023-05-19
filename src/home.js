import React,{useCallback, useState} from "react";
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    TextInput,
    ActivityIndicator,
  } from 'react-native';
  import axios from 'axios';
// import img4 from '../assets'

  const Weather = () => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
  
  
    const api = {
      key: 'fafd06c504e3d63092f1180ae1784811',
      baseUrl: 'https://api.openweathermap.org/data/2.5/',
    };
  
    
    
    const fetchDateHandler = useCallback(() => { setLoading(true);
      setInput('');
      axios({
        method: 'GET',
        url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=imperial&appid=${api.key}`,
      }).then(res => {
        console.log(res.data);
        setData(res.data);
      }).catch(e=>console.dir(e)).finally(()=>setLoading(false));
     } , [api.key,input]);
  
    return (
      <View style={styles.root}>
        <ImageBackground
          source={require('../assets/images/img4.jpg')}
          resizeMode="cover"
          style={styles.image}>
        <View>
          <TextInput placeholder="Search city ... " 
          onChangeText={text => setInput(text)} 
          value={input}
          placeholderTextColor={'#fff'}
          style={styles.textInput} 
          onSubmitEditing={fetchDateHandler}
          />
        </View>
        {loading && <View>
          <ActivityIndicator size={"large"} color='#000'/>
          </View>}
  
          {data && <View style={styles.infoView}>
            <Text style={styles.cityCountryText}>
              {`${data?.name} ${data?.sys?.country}`}
            </Text>
            <Text style={styles.dataText}>{new Date().toLocaleString()}</Text>
            <Text style={styles.tempText}>{`${Math.round(data?.main?.temp)} °C `}</Text>
            <Text style={styles.minMaxText}>{`Min ${Math.round(data?.main?.temp_min)} °C / Max ${Math.round(data?.main?.temp_max)} °C `}</Text>
            </View>}
        </ImageBackground>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },
    image: {
      flex: 1,
      flexDirection: 'column',
    },
    textInput:{
      borderWidth:1,
      padding:20,
      marginVertical:100,
      marginHorizontal:15,
      fontSize: 19,
      borderRadius: 16,
      borderColor:'#fff',
      color:'#fff'
    },
    infoView:{
      alignItems:'center'
    },
    cityCountryText:{
      color:'#fff',
      fontSize: 40,
      fontWeight:'bold',
    },
    dataText:{
      color: '#fff',
      fontSize:22,
      marginVertical:10,
    },
    tempText:{
      fontSize:45,
      color:'#fff',
      marginVertical:10,
    },
    minMaxText:{
      fontSize:22,
      color:'#fff',
      marginVertical:10,
      fontWeight:'500',
      
    }
  });
  
  export default Weather;