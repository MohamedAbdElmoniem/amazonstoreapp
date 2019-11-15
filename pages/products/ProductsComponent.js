import React, {Component} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import {Button, Text, CardItem, Thumbnail, Body, Left} from 'native-base';
import Axios from 'axios';
import * as lodash from 'lodash';
import {BarChart, PieChart} from 'react-native-chart-kit';

export default class ProductsComponent extends Component {
  static navigationOptions = {
    title: 'Products',
  };

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      data: [
        {
          name: 'Seoul',
          population: 21500000,
          color: 'rgba(131, 167, 234, 1)',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Toronto',
          population: 2800000,
          color: '#F00',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Beijing',
          population: 527612,
          color: 'red',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'New York',
          population: 8538000,
          color: '#ffffff',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Moscow',
          population: 11920000,
          color: 'rgb(0, 0, 255)',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
      ],
    };
  }

  componentWillMount() {
    const currentId = this.props.navigation.state.params.id;
    Axios.post('http://192.168.43.62:8085/getallproducts', {
      category_id: currentId,
    }).then(response => {
      this.setState({products: response.data.products});
    });
  }

  handleScrolling = () => {
    // let myScrollView = this.refs._scrollView;
    // for (let i = 0; i < (this.state.products.length - 1) * 360; i += 360) {
    //   (function(counter) {
    //     setTimeout(() => {
    //       debugger
    //       myScrollView.scrollTo({x: counter, y: 0, animated: true});
    //     }, 1000);
    //   })(i);
    // }
  };

  render() {
    const labels = this.state.products.map((val, ind) => val.product_name);
    const prices = this.state.products.map(
      (val, ind) => val.price - val.discount,
    );

    const BarChartData = {
      labels: labels,
      datasets: [
        {
          data: prices,
        },
      ],
    };

    return (
      <ScrollView style={{flex: 1}}>
        <ScrollView
          pagingEnabled
          horizontal
          ref="_scrollView"
          style={{height: 200}}
          onContentSizeChange={this.handleScrolling}
          showsHorizontalScrollIndicator={false}>
          {this.state.products.map((val, ind) => {
            return (
              <CardItem
                style={{
                  width: Dimensions.get('window').width,
                  height: 200,
                  borderRadius: 50,
                  borderColor: 'black',
                  borderWidth: 2,
                }}>
                <Left>
                  <Thumbnail source={require('./product.png')} />
                  <Body>
                    <Text>
                      {' '}
                      Name -->{' '}
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>
                        {val.product_name}
                      </Text>
                    </Text>
                    <Text> price --> {val.price}</Text>
                    <Text> discount --> {val.discount}</Text>
                    <Text> Model --> {val.model}</Text>
                    <Text> Brand --> {val.brand}</Text>

                    <Button
                      small
                      style={{
                        borderRadius: 50,
                        justifyContent: 'center',
                        marginTop: 10,
                      }}
                      onPress={() => {
                        let myCart = [...this.state.cart];

                        let isExist = lodash.find(
                          myCart,
                          o => o.product_name === val.product_name,
                        );

                        if (isExist) {
                          for (let i = 0; i < myCart.length; i++) {
                            if (myCart[i].product_name === val.product_name) {
                              myCart[i].count += 1;
                            }
                          }
                        } else {
                          myCart.push({
                            product_name: val.product_name,
                            price: val.price - val.discount,
                            count: 1,
                          });
                        }
                        this.setState({cart: myCart});
                      }}>
                      <Text>BUY</Text>
                    </Button>
                  </Body>
                </Left>
              </CardItem>
            );
          })}
        </ScrollView>
        <BarChart
          data={BarChartData}
          width={Dimensions.get('screen').width}
          height={240}
          yAxisLabel="EGP"
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
        />
        <PieChart
          data={this.state.data}
          width={Dimensions.get('screen').width}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            }
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
        {this.state.cart.map((val, ind) => {
          return (
            <View
              style={{
                marginTop: 10,
                borderRadius: 10,
                borderColor: 'red',
                borderWidth: 1,
                padding: 10,
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                <Text>{val.product_name}</Text>
                {' - '}
                <Text>{val.price} EGP </Text>
                <Text> * : {val.count}</Text>
              </Text>
              <Text>total price : {val.price * val.count}</Text>
            </View>
          );
        })}

        {this.state.cart.length > 0 ? (
          <Button
            success
            small
            style={{
              justifyContent: 'center',
              marginVertical: 20,
              marginHorizontal: 40,
              borderRadius: 20,
            }}>
            <Text>CHECKOUT</Text>
          </Button>
        ) : null}
      </ScrollView>
    );
  }
}
