// Profile Habit

import React from 'react';
import { View } from 'react-native';
import { StackActions } from 'react-navigation';
import VersionNumber from 'react-native-version-number';

import BaseComponent from '../base';
import { BaseView, Header, AvoButton } from '../../components';
import Diet from './components/diet';
import { updateProfileRequest, userStatusRequest } from '../../actions';
import styles from './styles';
import { connect } from 'react-redux';
import constants from '../../const';

class ProfileHabit extends BaseComponent {
	constructor(props) {
		super(props);

		this.state = {
			dietFood: []
		};
	}

	componentDidMount = () => {
		const { isWaiting, accessToken, id, error, profileData } = this.props;
		const { filters, diet } = profileData;
		const dietsKeys = Object.keys(profileData.filters.diets);
		var array = [];
		dietsKeys.map((item) => {
			var isCheck = false;
			if (item == diet) isCheck = true;
			var node = { isCheck, title: filters.diets[item], key: item };
			array.push(node);
		});
		this.setState({ dietFood: array });
	};

	componentDidUpdate = (prev) => {
		const { isProfileUpdate, userData, userStatusRequest, navigation } = this.props;

		if (prev.isProfileUpdate != isProfileUpdate && isProfileUpdate) {
			const { access_token } = userData;

			userStatusRequest({ 
				access_token,
				version: VersionNumber.appVersion 
			});
			constants.DropDownAlert.showDropdownAlert(
				'success',
				'Success',
				`Profil mis à jour.`
			);
			navigation.dispatch(StackActions.pop());
		}
		// if (error != '') {
		// 	constants.DropDownAlert.showDropdownAlert('error', 'Régime alimentaire', error);
		// }
	};

	onPressDiet = (item, index) => {
		const { dietFood } = this.state;
		var array = [];
		dietFood.map((food) => {
			var tempFood = food;
			tempFood.isCheck = false;
			array.push(tempFood);
		});
		array[index].isCheck = !array[index].isCheck;
		this.setState({ dietFood: array });
	}

	onBtnSubmit = () => {
		const { updateProfileRequest, userData } = this.props;
		const { dietFood } = this.state;
		const { access_token } = userData;
		var diet = "";
		dietFood.map(item => {
			if (item.isCheck) diet = item.key;
		});
		updateProfileRequest({ access_token, diet });
	};

	render() {
		const { isWaiting, navigation } = this.props;
		const { dietFood } = this.state;

		return (
			<BaseView>
				<Header title="Régime alimentaire" navigation={navigation} isBack />
				<View style={styles.container}>
					<Diet
						food={dietFood}
						onPress={this.onPressDiet}
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
		error: profile.eMessage,
		isProfileUpdate,
		profileData,
		userData: auth.userData
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHabit);
