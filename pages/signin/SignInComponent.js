import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Input, Text, Button, CheckBox, Label, Item} from 'native-base';
import Axios from 'axios';

export default class SignInComponent extends Component {
  static navigationOptions = {
    title: 'Sign-in',
    headerStyle: {
      backgroundColor: 'yellow',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super();
    this.state = {
      username: 'moniem2',
      password: '123',
    };
  }

  handleSignin = () => {
    if (this.state.username && this.state.password) {
      let data = {username: this.state.username, password: this.state.password};
      Axios.post('http://192.168.43.62:8085/signin', data, {
        withCredentials: true,
      }).then(response => {
        if (response.data.message === 'success') {
          this.props.navigation.navigate('home', {user: response.data.user});
        } else {
          alert('error');
        }
      });
    } else {
      alert('please enter your username/password');
    }
  };

  catchValues = value => {
    this.setState({[value.type]: value.text});
  };

  render() {
    return (
      <ScrollView style={{padding: 16}}>
        <View
          style={{backgroundColor: '#f0554d', padding: 40, borderRadius: 30}}>
          <Item rounded style={{backgroundColor: 'white'}}>
            <Input
              placeholder="enter username"
              onChangeText={text => {
                this.catchValues({type: 'username', text});
              }}
              style={{}}
              value={this.state.username}
            />
          </Item>
          <View style={{height: 30}} />
          <Item rounded last style={{backgroundColor: 'white'}}>
            <Input
              placeholder="enter password"
              secureTextEntry={true}
              onChangeText={text => {
                this.catchValues({type: 'password', text});
              }}
              value={this.state.password}
            />
          </Item>
          <View style={{height: 20}} />
          <Button
            onPress={this.handleSignin}
            style={{
              justifyContent: 'center',
              marginBottom: 20,
              borderRadius: 30,
            }}>
            <Text>signin</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}
