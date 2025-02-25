import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import pattern from '../../assets/pattern.png'
import Logo from '../../assets/mainLogo.png'
import { button1 } from '../common/button'
import { formgroup, head1, head2, label, input, link, link2, errormessage } from '../common/formcss'

const Login = ({ navigation }) => {
  const [fdata, setFdata] = useState({
    email: '',
    password: ''
  })

  const [errormsg, setErrormsg] = useState(null);

  const Sendtobackend = () => {
    if (fdata.email == '' || fdata.password == '') {
      setErrormsg('All fields are required');
      return;
    }
    else {
      fetch('http://10.23.91.69:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fdata)
      })
        .then(res => res.json()).then(
          data => {
             //console.log(data);
            if (data.error) {
              setErrormsg(data.error);
            }
            else {
              alert('Logged in successfully');
              navigation.navigate('homepage');
            }
          }
        )
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

          <Text style={head1}>Login</Text>
          <Text style={head2}>Sign in to continue</Text>
          {
            errormsg ? <Text style={errormessage}>{errormsg}</Text> : null
          }
          <View style={formgroup}>
            <Text style={label}>Email</Text>
            <TextInput style={input}
              placeholder='Enter your email'
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, email: text })}
            />
          </View>
          <View style={formgroup}>
            <Text style={label}>Password</Text>
            <TextInput style={input}
              placeholder='Enter your password'
              onPressIn={() => setErrormsg(null)}
              secureTextEntry={true}
              onChangeText={(text) => setFdata({ ...fdata, password: text })}
            />
          </View>
          <View style={styles.fp}>
            <Text style={link}>Forgot Password?</Text>
          </View>
          <Text style={button1}
            onPress={() => Sendtobackend()}
          >Login</Text>
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

export default Login

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