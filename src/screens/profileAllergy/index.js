// Profile Allergies

import React from 'react';
import { View } from 'react-native';
import { StackActions } from 'react-navigation';
import VersionNumber from 'react-native-version-number';

import BaseComponent from '../base';
import { BaseView, Header, AvoButton, Block } from '../../components';
import Allergy from './components/allergy';
import { updateProfileRequest, userStatusRequest } from '../../actions';
import styles from './styles';
import { connect } from 'react-redux';
import constants from '../../const';

class ProfileAllergy extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			allergyFood: [],
		};
	}

	componentDidMount = () => {
		const { profileData } = this.props;
		const { filters, allergies } = profileData;
		const allergiesKeys = Object.keys(filters.allergies);
		console.log(profileData);
		var array = [];
		allergiesKeys.map((key) => {
			var isCheck = false;
			if (Object.keys(allergies).length) {
				allergies.map((allergy) => {
					if (key == allergy) isCheck = true;
				});
			}
			var node = { isCheck, title: filters.allergies[key], key };
			array.push(node);
		});
		this.setState({ allergyFood: array });
	}

	componentDidUpdate = (prev) => {
		const { isProfileUpdate, userData, userStatusRequest, navigation } = this.props;

		if (prev.isProfileUpdate != isProfileUpdate && isProfileUpdate) {
			const { access_token } = userData;
			userStatusRequest({
				access_token,
				version: VersionNumber.appVersion
			});
			constants.DropDownAlert.showDropdownAlert('success', 'Allergies', `Allergies data updated`);
			navigation.dispatch(StackActions.pop());
		}
	};

	onPressAllergy = (item, index) => {
		const { allergyFood } = this.state;
		var array = [];
		allergyFood.map((allergy) => {
			var tempAllergy = allergy;
			if (allergy.key == item.key) tempAllergy.isCheck = !tempAllergy.isCheck;
			array.push(tempAllergy);
		});
		this.setState({ allergyFood: array });
	}

	onBtnSubmit = () => {
		const { updateProfileRequest, userData } = this.props;
		const { allergyFood } = this.state;
		const { access_token } = userData;

		var params = { access_token };

		allergyFood.map((value, index) => {
			const { key, isCheck } = value;
			if (isCheck) params[`allergies[${index}]`] = key;
		});

		if (Object.keys(params).length == 1) {
			params['allergies'] = "";
		}

		console.log(params);
		updateProfileRequest(params);
	};

	render() {
		const { isWaiting } = this.props;
		const { allergyFood } = this.state;

		return (
			<BaseView>
				<Header title="Allergie(s)" navigation={this.props.navigation} isBack />
				<View style={styles.container}>
					<Allergy
						title={`As-tu des allergies ? On va éviter les recettes qui font mal …`}
						allergyFood={allergyFood}
						onPress={this.onPressAllergy}
					/>
					<View style={{ flex: 1 }} />
					<AvoButton
						isLoading={isWaiting}
						style={styles.button}
						title="C'est parti !"
						onPress={() => this.onBtnSubmit()}
					/>
				</View>
			</BaseView>
		);
	}
}

const mapDispatchToProps = {
	updateProfileRequest,
	userStatusRequest
};

const mapStateToProps = (state) => {
	const { auth, profile } = state.reducer;
	const { profileData, isProfileUpdate } = profile;

	return {
		isWaiting: profile.isLoading,
		accessToken: auth.accessToken,
		id: auth.id,
		error: auth.eMessage,
		userData: auth.userData,
		profileData,
		isProfileUpdate
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAllergy);
