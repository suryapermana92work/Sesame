// App

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Mixpanel from 'react-native-mixpanel';

import AppContainer from './src';
import store from './src/store';
import GlobalModule from './GlobalModule';
import constants from './src/const';

export default class App extends React.Component {

	componentDidMount() {
		// Mixpanel.sharedInstanceWithToken(constants.thirdPartyKeys.mixpanelToken);
	}

	render() {
		console.disableYellowBox = true;
		return (
			<Provider store={store}>
				<StatusBar barStyle={'light-content'} backgroundColor={constants.colors.tint} />
				<SafeAreaProvider>
					<GlobalModule>
						<AppContainer />
					</GlobalModule>
				</SafeAreaProvider>
			</Provider>
		);
	}
}
