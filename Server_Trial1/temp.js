import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import pattern from '../../assets/pattern.png';
import Logo from '../../assets/mainLogo.png';
import { button1 } from '../common/button';
import { formgroup, head1, head2, label, input, link, link2, input1, errormessage } from '../common/formcss';

import DateTimePicker from '@react-native-community/datetimepicker';

const Signup = ({
  navigation
}) => {
  const [fdata, setFdata] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    dob: '',
    address: '',    
  });

  const [errormsg, setErrormsg] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setFdata({ ...fdata, dob: formattedDate });
    }
  };

  const Sendtobackend = () => {
    console.log(fdata);
    if (fdata.name === '' ||
        fdata.email === '' ||
        fdata.password === '' ||
        fdata.cpassword === '' ||
        fdata.dob === '' ||
        fdata.address === '') {
        setErrormsg('All fields are required');
        return;
    } else {
      if (fdata.password !== fdata.cpassword) {
          setErrormsg('Password and Confirm Password must be same');
          return;
      } else {
        fetch('http://10.23.93.8:3000/verify', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(fdata)
      })
        .then(res => res.json()).then(
          data => {
            if (data.error === 'Invalid Credentials') {
              setErrormsg('Invalid Credentials');
            } else if (data.message === "Verification Code Sent to your Email") {
              alert(data.message);
              navigation.navigate('verification', { userdata: data.udata });
            }
          }
        );
      }
    }
  };  

  return (
    <View style={styles.container}>
      <Image style={styles.patternbg} source={pattern}/>

      <View style={styles.container1}>
        <View style={styles.s1}>

        </View>
        <ScrollView style={styles.s2}>
          <Text style={head1}>Create a new account</Text>
          <Text style={link2}>Already registered?&nbsp;
            <Text style={link}
                onPress={() => navigation.navigate('login')}
            >
              Login here
            </Text>
          </Text>
          {
             errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
          }
          <View style={formgroup}>
            <Text style={label}>Name</Text>
            <TextInput style={input} placeholder='Enter your name'
            onPressIn={() => setErrormsg(null)}
            onChangeText={(text) => setFdata({ ...fdata, name: text })}/>
          </View>
          <View style={formgroup}>
            <Text style={label}>Email</Text>
            <TextInput style={input} placeholder='Enter your email'
            onPressIn={() => setErrormsg(null)}
            onChangeText={(text) => setFdata({ ...fdata, email: text })}/>
          </View>
          <View style={formgroup}>
            <Text style={label}>DOB</Text>
            <TouchableOpacity
              style={styles.inputContainerStyle}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.textStyle}>
                {fdata.dob ? fdata.dob : 'Select your Date of Birth'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                value={new Date()}
                maximumDate={new Date()}
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
          <View style={formgroup}>
            <Text style={label}>Password</Text>
            <TextInput style={input} placeholder='Enter your password'
            onPressIn={() => setErrormsg(null)}
            secureTextEntry={true}
            onChangeText={(text) => setFdata({ ...fdata, password: text })}/>
          </View>
          <View style={formgroup}>
            <Text style={label}>Confirm Password</Text>
            <TextInput style={input} placeholder='Confirm your password'
            onPressIn={() => setErrormsg(null)}
            secureTextEntry={true}
            onChangeText={(text) => setFdata({ ...fdata, cpassword: text })}/>
          </View>
          <View style={formgroup}>
            <Text style={label}>Address</Text>
            <TextInput style={input1} placeholder='Enter your address'
            onPressIn={() => setErrormsg(null)}
            onChangeText={(text) => setFdata({ ...fdata, address: text })}/>
          </View>
          <TouchableOpacity
            onPress={() => {
              Sendtobackend();
            }}>
            <Text style={button1}>Signup</Text>
          </TouchableOpacity>

        </ScrollView>

      </View>

    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  patternbg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
  },
  container1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  s1: {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
  },
  small: {
    color: '#fff',
    fontSize: 17,
  },
  h1: {
    fontSize: 30,
    color: '#fff',
  },
  s2: {
    display: 'flex',
    backgroundColor: '#fff',
    width: '100%',
    height: '90%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
  },
  formgroup:{
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 17,
    color: '#000',
    marginLeft: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#c3ebe8",
    borderRadius: 20,
    padding: 10,
    marginLeft:10,
    marginRight:10,
  },
  inputContainerStyle: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CAD3DF',
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingRight: 10,
    height: 50,
  },
  textStyle: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  fp: {
    display: 'flex',
    alignItems: 'flex-end',
    marginHorizontal: 10,
    marginVertical: 5,
  }
});
