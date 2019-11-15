import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Input, Text, Button, CheckBox} from 'native-base';
import Axios from 'axios';

export default class SignUpComponent extends Component {
  static navigationOptions = {
    title: 'Sign-up',
    headerStyle: {
      backgroundColor: 'yellow',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '123',
      email: 'ffdsf',
      age: '33',
      address: 'egy',
      admin: false,
      phone: '4324324',
    };
  }

  catchValues = value => {
    this.setState({[value.type]: value.text});

    // if (value.type === 'username') {
    //   this.setState({username: value.text});
    // }
    // if (value.type === 'password') {
    //   this.setState({password: value.text});
    // }
    // if (value.type === 'email') {
    //   this.setState({email: value.text});
    // }
    // if (value.type === 'address') {
    //   this.setState({address: value.text});
    // }
    // if (value.type === 'age') {
    //   this.setState({age: value.text});
    // }
    // if (value.type === 'phone') {
    //   this.setState({phone: value.text});
    // }
    // if (value.type === 'role') {
    //   this.setState({role: value.text});
    // }
  };

  handleSignup = () => {
    const {username, password, age, phone, address, admin, email} = this.state;
    if (username && password && age && phone && address && email) {
      let data = {
        username: this.state.username,
        password: this.state.password,
        age: this.state.age,
        email: this.state.email,
        address: this.state.address,
        role: admin ? 'admin' : 'user',
        phone: this.state.phone,
      };
      Axios.post('http://192.168.43.62:8085/signup', data).then(response => {
        if (response.data.message === 'success') {
          this.props.navigation.navigate('signin');
        } else {
          alert('error');
        }
      });
    } else {
      alert('please complete your signup');
    }
  };

  render() {
    return (
      <ScrollView style={{padding: 10}}>
        <Text>username: </Text>
        <Input
          placeholder="enter username"
          onChangeText={text => {
            this.catchValues({type: 'username', text});
          }}
          style={{borderColor: 'black', borderWidth: 1, margin: 10}}
          value={this.state.username}
        />
        <Text>password: </Text>

        <Input
          placeholder="enter password"
          secureTextEntry={true}
          onChangeText={text => {
            this.catchValues({type: 'password', text});
          }}
          style={{borderColor: 'black', borderWidth: 1, margin: 10}}
          value={this.state.password}

        />
        <Text>email: </Text>

        <Input
          placeholder="enter email"
          onChangeText={text => {
            this.catchValues({type: 'email', text});
          }}
          style={{borderColor: 'black', borderWidth: 1, margin: 10}}
          value={this.state.email}

        />
        <Text>phone: </Text>

        <Input
          placeholder="enter phone"
          keyboardType="numeric"
          onChangeText={text => {
            this.catchValues({type: 'phone', text});
          }}
          style={{borderColor: 'black', borderWidth: 1, margin: 10}}
          value={this.state.phone}

        />
        <Text>address: </Text>

        <Input
          placeholder="enter address"
          onChangeText={text => {
            this.catchValues({type: 'address', text});
          }}
          style={{borderColor: 'black', borderWidth: 1, margin: 10}}
          value={this.state.address}

        />
        <Text>age: </Text>

        <Input
          placeholder="enter age"
          onChangeText={text => {
            this.catchValues({type: 'age', text});
          }}
          style={{borderColor: 'black', borderWidth: 1, margin: 10}}
          value={this.state.age}

        />
        <Text style={{fontSize: 20, marginBottom: 10}}>Admin</Text>
        <CheckBox
          checked={this.state.admin}
          onPressOut={() => {
            this.setState({admin: !this.state.admin});
          }}
          style={{marginBottom: 10}}
        />

        <Button
          onPress={this.handleSignup}
          style={{justifyContent: 'center', marginBottom: 20}}>
          <Text>signup</Text>
        </Button>
        <Button
          onPress={()=>{
            this.props.navigation.navigate('signin')
          }}
          style={{justifyContent: 'center', marginBottom: 20}}>
          <Text>signin</Text>
        </Button>
      </ScrollView>
    );
  }
}
