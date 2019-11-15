import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SignUpComponent from './pages/signup/SignUpComponent';
import SignInComponent from './pages/signin/SignInComponent';
import HomeComponent from './pages/home/HomeComponent';
import ProductsComponent from './pages/products/ProductsComponent';

const Routes = createStackNavigator({
  signup: {screen: SignUpComponent},
  signin: {screen: SignInComponent},
  home: {screen: HomeComponent},
  products: {screen: ProductsComponent},
});

export default createAppContainer(Routes);
