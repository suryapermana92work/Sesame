// Favorite

import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { StackActions } from "react-navigation";

import BaseComponent from '../../base';
import { AvoText, AvoCard } from '../../../components';
import { IconPlusWBG } from '../../../assets/svg';

import { searchFevRecRequest } from '../../../actions/authActions';
import { getFavoritesRequest, addToMenuRequest } from '../../../actions';

import constants from '../../../const';
import styles from './styles';

class Favorite extends BaseComponent {

	constructor(props) {
		super(props);

		this.state = {
			isRefresh: true,
			searchResult: [],
			isWaitingLoading: false,
			popupCount: 1,
			recipeType: [
				{ id: 1, name: `Entrée`, selected: false },
				{ id: 1, name: `Omnivore`, selected: false },
				{ id: 1, name: `Plat`, selected: false },
				{ id: 1, name: `Entrée`, selected: false }
			],
			favorites: []
		};
	}

	componentDidMount = () => {
		const { userData, favoritesObject, isLoading, getFavoritesRequest } = this.props;

		if (favoritesObject != null) {
			this.loadFavorites(favoritesObject);
			return;
		}

		if (!this.isAuthenticated() || isLoading) return;

		const { access_token } = userData;
		var params = { access_token };
		getFavoritesRequest(params);
	};

	componentDidUpdate = (prev) => {
		const { favoritesObject, isWaiting, addMenuStatus, isAddedMenu, error } = this.props;

		if (prev.addMenuStatus != addMenuStatus && addMenuStatus == true) {
			constants.DropDownAlert.showDropdownAlert('success', 'Success', `Recette ajoutée :)`);
			constants.showLoader.hideLoader();
		}

		if (isWaiting) {
			constants.showLoader.showLoader();
		} else {
			constants.showLoader.hideLoader();
		}

		if (favoritesObject != prev.favoritesObject) {
			this.loadFavorites(favoritesObject);
		}
		if (prev.isAddedMenu != isAddedMenu && isAddedMenu) {
      
    }
		if (error != prev.error) {
			console.log(error);
		}
	};

	loadFavorites = favoritesObject => {
		if (favoritesObject == null) return;

		const { favorites } = this.state;
		const { recipes } = favoritesObject;
		var array = [];

		if (!this.isArrayAvailable(recipes)) return;

		recipes.map(recipe => {
			array.push(recipe);
		});

		if (JSON.stringify(array) != JSON.stringify(favorites)) {
			this.setState({ favorites: array });
		}

		console.log(array);
	}

	addToMenu = uid => {
    const { userData, addToMenuRequest } = this.props;
    const { access_token } = userData;
    const params = {
      access_token,
      main_course_uid: uid
    };
    addToMenuRequest(params);
  };

	renderEmpty = () => {
		const { isLoading } = this.props;

		return (
			!isLoading ?
				<AvoText
					style={{ fontSize: constants.sizes.TXT_SIZE }}
					text={`Il n'y a pas d'éléments à afficher`}
				/>
				:
				<View />
		)
	}

	renderItem = ({ item, index }) => {
		const { navigation } = this.props;
		const { uid } = item;

		return (
			<AvoCard
				type={3}
				data={item}
				onCard={() => {
					navigation.dispatch(StackActions.push({
						routeName: "ItemDetails",
						params: { id: uid }
					}));
				}}
				onPlus={() => this.addToMenu(uid)}
			/>
		);
	}

	render() {
		const { favorites } = this.state;

		return (
			<View style={styles.container}>
				<FlatList
					data={favorites}
					style={{ flex: 1 }}
					renderItem={this.renderItem}
					extraData={this.state}
					keyExtractor={item => item.id}
					contentContainerStyle={favorites.length < 1 && constants.styles.wrapperHVCenter}
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={() => this.renderEmpty()}
				/>
			</View>
		)
	}

}

const mapDispatchToProps = {
	getFavoritesRequest,
	searchFevRecRequest,
	addToMenuRequest
};

const mapStateToProps = (state) => {
	const { auth, favorite, menu } = state.reducer;
	const { id, userData, accessToken } = auth;
	const { isAddedMenu } = menu;
	const { isLoading, favoritesObject, error } = favorite;

	return {
		isLoading,
		favoritesObject,
		accessToken,
		id,
		error,
		userData,
		addMenuStatus: auth.addMenuStatus,
		isAddedMenu
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);