// App Initial Screen

import React from 'react';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import { StackActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import VersionNumber from 'react-native-version-number';

import BaseComponent from './base';
import { BaseView } from "../components";
import { autoLoginRequest, userStatusRequest } from '../actions';
import constants from '../const';

class AppInitial extends BaseComponent {

	componentDidMount() {
		this.checkAppStatus();
	}

	componentDidUpdate(prevProps) {
		const {
			isLoginWaiting,
			accessToken,
			id,
			isRegister,
			error,
			userData,
			navigation,
			userStatusRequest
		} = this.props;

		if (prevProps.id != id) {
			console.log('id');
		}

		if (prevProps.isLoginWaiting != isLoginWaiting) {
			console.log('isLoginWaiting');
		}

		if (prevProps.navigation != navigation) {
			// console.log('navigation');
		}

		if (prevProps.userData != userData) {
			const { access_token } = userData;
			userStatusRequest({
				access_token,
				version: VersionNumber.appVersion
			});
		}

		if (error != '') {
			console.log(error);
			navigation.dispatch(StackActions.push({ routeName: "Auth" }));
		} else {
			if (prevProps.accessToken != accessToken) {
				if (this.isValueAvailable(accessToken)) {
					console.log("Login");
					navigation.dispatch(StackActions.push({ routeName: isRegister ? "Welcome" : "Main" }));
				} else {
					navigation.dispatch(StackActions.push({ routeName: "Auth" }));
				}
			}
		}
	}

	autoLoginCheck = token => {
		const { autoLoginRequest } = this.props;
		const params = { token };
		autoLoginRequest(params);
	};

	checkAppStatus = async () => {
		const { navigation } = this.props;

		try {
			const first_launch = await AsyncStorage.getItem('@first_launch');
			const access_token = await AsyncStorage.getItem('@access_token');
			if (first_launch != null) {
				if (access_token) {
					this.autoLoginCheck(access_token);
				} else {
					navigation.dispatch(StackActions.push({ routeName: "Auth" }));
				}
			} else {
				navigation.dispatch(StackActions.push({ routeName: "Intro" }));
			}
		} catch (e) {
			console.log(e);
		}
	};

	render() {
		return (
			<BaseView>
				<Image
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: constants.screen.width,
						height: constants.screen.height
					}}
					source={require('../assets/png/background.jpg')}
					resizeMode='cover'
				/>
				<View style={constants.styles.wrapperHVCenter}>
					<Image
						style={{
							width: constants.screen.width * 0.4,
							height: constants.screen.width * 0.44
						}}
						source={require('../assets/png/sesame_logo.png')}
						resizeMode='stretch'
					/>
				</View>
			</BaseView>
		);
	}
}

const mapStateToProps = (state) => {
	const { auth, profile } = state.reducer;
	const { isRegister } = auth;

	return {
		isLoginWaiting: auth.isWaiting,
		accessToken: auth.accessToken,
		id: auth.id,
		isRegister,
		error: auth.eMessage,
		userData: auth.userData,
		profileData: profile.profileData
	};
};

const mapDispatchToProps = {
	autoLoginRequest,
	userStatusRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(AppInitial);
