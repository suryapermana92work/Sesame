// Auth Navigation

import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/login';
import Landing from '../screens/landing';

const AuthNavigator = createStackNavigator(
  {
    Landing: {
      screen: Landing
    },
    Login: {
      screen: Login
    }
  }, {
    initialRouteName: 'Landing',
    defaultNavigationOptions: {
      headerShown: false
    }
  }
)

export default AuthNavigator;