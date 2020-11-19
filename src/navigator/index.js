// App Navigator

import { createStackNavigator } from 'react-navigation-stack';

import AppInitial from '../screens';
import IntroNavigator from './introNavigator';
import AuthNavigator from './authNavigator';
import TabNavigator from './tabNavigator';
import ProfileNavigator from './profileNavigator';
import Welcome from '../screens/welcome';
import UpgradeReminder from '../screens/upgrade';

const AppNavigator = createStackNavigator(
	{
		Initial: {
			screen: AppInitial
		},
		Intro: {
			screen: IntroNavigator
		},
		Auth: {
			screen: AuthNavigator
		},
		Welcome: {
			screen: Welcome
		},
		Main: {
			screen: TabNavigator
		},
		ProfileStack: {
			screen: ProfileNavigator
		},
		UpgradeApp: {
			screen: UpgradeReminder
		}
	},
	{
		initialRouteName: 'Initial',
		defaultNavigationOptions: {
			headerShown: false,
			gestureEnabled: false
		}
	}
);

export default AppNavigator;
