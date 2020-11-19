// Profile Allergies

import React from "react";
import { connect } from 'react-redux';
import { View } from "react-native";
import { StackActions } from 'react-navigation';
import VersionNumber from 'react-native-version-number';

import BaseComponent from "../base";
import { BaseView, Header, AvoButton, Block } from '../../components';
import SearchSettingPopup from '../../components/searchSettingPopup';
import Ingredient from "./components/ingredient";

import { searchInspirationRequest, updateProfileRequest, userStatusRequest } from '../../actions';

import styles from "./styles";
import constants from "../../const";

class ProfileIngredient extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      dialogShowSearch: false,
      searchTxt: "",
      searchResult: [],
      ingredients: []
    };
  }

  componentDidMount = () => {
    const { error, profileData } = this.props;
    const { ingredients_disliked } = profileData;
    var array = [];

    ingredients_disliked.map((item) => {
      array.push({
        isCheck: true,
        title: item.name,
        key: item.id
      });
    });
    this.setState({ ingredients: array });
  }

  componentDidUpdate = prev => {
    const { userData, isProfileUpdate, navigation, searchResult, userStatusRequest } = this.props;
    const { searchTxt } = this.state;

    if (prev.isProfileUpdate != isProfileUpdate && isProfileUpdate) {
      const { access_token } = userData;
      
			userStatusRequest({ 
				access_token, 
				version: VersionNumber.appVersion 
			});
      navigation.dispatch(StackActions.pop());
    }

    if (this.isObjectAvailable(searchResult) && searchTxt.length > 1) {
      var array = [];
      searchResult.map((item) => {
        array.push(item);
      });
      if (JSON.stringify(array) != JSON.stringify(searchResult)) {
        this.setState({ searchResult: array });
      }
    }
  };

  onSearch = text => {
    const { searchInspirationRequest, userData } = this.props;

    if (this.isObjectAvailable(userData) && text.length > 1) {
      const params = {
        access_token: userData.access_token,
        name: text
      };
      this.setState({ searchTxt: text });
      searchInspirationRequest(params);
    }
  }

  onResult = ingredients => {
    this.setState({ ingredients });
  }

  updateProfile = () => {
    const { navigation, updateProfileRequest, userData } = this.props;
    const { ingredients } = this.state;
    const { access_token } = userData;

    if (!this.isValueAvailable(access_token)) return;

    var params = { access_token }

    ingredients.map((item, index) => {
      if (item.isCheck) params[`ingredients_disliked[${index}]`] = item.key;
    });
    
    if (Object.keys(params).length == 1) {
      params[`ingredients_disliked[]`] = "";
    }
    updateProfileRequest(params);
  };

  render() {
    const { navigation, isSearching, isLoading, searchResult } = this.props;
    const { ingredients, allergyFood } = this.state;

    return (
      <BaseView>
        <Header
          title="Je n'aime pas..."
          navigation={navigation}
          isBack
        />
        <View style={styles.container}>
          <Ingredient
            title={`Pas de ça dans mon plat ! Indiquez les ingrédients que vous n'aimez pas.`}
            searchResult={searchResult}
            ingredients={ingredients}
            isWaiting={isSearching}
            isLoading={isLoading}
            isRegistration={false}
            onSearch={text => this.onSearch(text)}
            onResult={this.onResult}
            onPressEnd={() => { this.updateProfile() }}
          />
        </View>
      </BaseView>
    );
  }
}
const mapStateToProps = state => {
  const { auth, inspiration, profile } = state.reducer;
  const { profileData, isProfileUpdate } = profile;
  const { searchResult, isLoading } = inspiration;

  return {
    isLoading: profile.isLoading,
    id: auth.id,
    error: auth.eMessage,
    profileUpdate: auth.profileUpdate,
    userData: auth.userData,
    searchIndArr: auth.searchIndArr,
    searchResult,
    isSearching: isLoading,
    profileData,
    isProfileUpdate
  };
};

const mapDispatchToProps = {
  updateProfileRequest,
  searchInspirationRequest,
  userStatusRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIngredient);
