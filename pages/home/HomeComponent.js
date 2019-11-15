import React, {Component} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import Axios from 'axios';
import {Card, CardItem, Text, Icon, Right} from 'native-base';

export default class HomeComponent extends Component {
  static navigationOptions = {
    title: 'Categories',
  };

  constructor(props) {
    super();
    this.state = {categories: []};
  }

  componentWillMount() {
    Axios.get('http://192.168.43.62:8085/getallcategories').then(response => {
      this.setState({categories: response.data.categories});
    });
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '#83cee6'}}>
        <Card
          style={{
            marginTop: 50,
            paddingHorizontal: 20,
            backgroundColor: '#fffca3',
          }}>
          {this.state.categories.map((val, ind) => {
            return (
              <CardItem
                style={{borderColor: 'black', borderWidth: 2, margin: 10}}>
                <Icon active name="cart" />
                <Text>{val.category_name}</Text>
                <Right>
                  <Icon
                    onPress={() => {
                      this.props.navigation.navigate('products', {id: val._id});
                    }}
                    name="arrow-forward"
                  />
                </Right>
              </CardItem>
            );
          })}
        </Card>
      </ScrollView>
    );
  }
}
