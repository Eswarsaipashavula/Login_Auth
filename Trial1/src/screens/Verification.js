import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import pattern from '../../assets/pattern.png'
import Logo from '../../assets/mainLogo.png'
import { button1 } from '../common/button'
import { formgroup, head1, head2, label, input, link, link2, errormessage, bwmessage } from '../common/formcss'

const Verification = ({ navigation, route }) => {

  const { userdata } = route.params;

  const [errormsg, setErrormsg] = useState(null);
  const [userCode, setUserCode] = useState('XXXX');
  const [actualCode, setActualCode] = useState(null);

  useEffect(() => {
    setActualCode(userdata[0]?.VerificationCode);
  }, [])

  const Sendtobackend = () => {
    console.log(userCode);
    console.log(actualCode);

    if (userCode == 'XXXX' || userCode == '') {
      setErrormsg('Please enter the code');
      return;
    }
    else if (userCode == actualCode) {
      console.log('correct code');
      const fdata = {
        email: userdata[0]?.email,
        password: userdata[0]?.password,
        name: userdata[0]?.name,
        address: userdata[0]?.address,
        dob: userdata[0]?.dob,
      }

      fetch('http://10.23.91.69:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fdata)
      })
        .then(res => res.json())
        .then(data => {
           console.log(data);
          if (data.message === 'User Registered Successfully') {
            alert(data.message);
            navigation.navigate('login')
          }
          else {
            alert("Something went wrong !! Try Signing Up Again");

          }
        })
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.patternbg} source={pattern} />

      <View style={styles.container1}>
        <View style={styles.s1}>
          <Image style={styles.logo} source={Logo} />
          <Text style={styles.h1} onPress={() => navigation.navigate('welcome')}>LMS, Inc.</Text>
          <Text style={styles.small}>Study Group Interaction</Text>

        </View>
        <View style={styles.s2}>

          <Text style={head1}>Verification</Text>
          <Text style={bwmessage}>A code has been sent to your mail id</Text>
          {
            errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
          }

          <View style={formgroup}>
            <Text style={label}>Code</Text>
            <TextInput style={input}
              placeholder='Enter 6 digit Verification Code'
              onPressIn={() => setErrormsg(null)}
              secureTextEntry={true}
              onChangeText={(text) => setUserCode(text)}
            />
          </View>
          <View style={styles.fp}>
            <Text style={link}>Forgot Password?</Text>
          </View>
          <Text style={button1}
            onPress={() => Sendtobackend()}
          >Verify</Text>
          <Text style={link2}>Dont have an account?&nbsp;
            <Text style={link}
              onPress={() => navigation.navigate('signup')}
            >
              Create a new account
            </Text>
          </Text>
        </View>

      </View>

    </View>
  )
}

export default Verification

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
    //zIndex: -1,
  },
  container1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  s1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
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
    height: '60%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
  formgroup: {
    display: 'flex',
    flexDirection: 'coloumn',
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
    marginLeft: 10,
    marginRight: 10,
  },
  fp: {
    display: 'flex',
    alignItems: 'flex-end',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  logo: {
    height: 80,
    resizeMode: 'contain',
  },
})