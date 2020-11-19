// Profile Home

import React from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity } from "react-native";
import VersionNumber from 'react-native-version-number';
import Swiper from "react-native-swiper";
import { StackActions } from 'react-navigation';

import BaseComponent from "../base";
import { BaseView, Header, AvoText } from "../../components";
import Household from "../profileHome/components/household";
import Diet from "../profileHabit/components/diet";
import Allergy from "../profileAllergy/components/allergy";
import Ingredient from "../profileIngredient/components/ingredient";
import Kitchen from '../profileKitchen/ketchen';
import Dots from "./dots";

import {
  updateUserProfile,
  searchInspirationRequest,
  updateProfileRequest,
  userStatusRequest,
  setFamilyRequest
} from '../../actions';

import styles from "./styles";
import constants from "../../const";

class Welcome extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      isSwipeEnable: true,
      offsetX: 0,
      fullName: "",
      isBackHidden: false,
      isForwardHidden: true,
      adultNumber: 1,
      childNumber: 0,
      DietFood: [],
      allergyFood: [],
      allergyFoodFilter: [],
      ingredients: [],
      dialogShowSearch: false,
      searchResult: [],
      searchTxt: "",
      searchAllergyTxt: ""
    };
  }

  componentDidMount = () => {
    const { userData } = this.props;
    const { ingredients_disliked, filters } = userData;
    const { allergies, diets } = filters;
    const allergieKeys = Object.keys(allergies);
    const dietKeys = Object.keys(diets);

    var array = [];

    ingredients_disliked.map((item) => {
      array.push({
        isCheck: true,
        title: item.name,
        key: item.id
      });
    });
    this.setState({ ingredients: array });

    if (userData) {
      var fullName = userData.firstname && userData.firstname != null ? userData.firstname : "";
      fullName = `${fullName} ${userData.lastname && userData.lastname != null ? userData.lastname : ""}`;
      this.setState({ fullName });
    }

    array = [];
    allergieKeys.map(item => {
      const node = {
        isCheck: false,
        title: userData.filters.allergies[item],
        key: item
      };
      array.push(node);
    });
    this.setState({ allergyFood: array });

    array = [];
    dietKeys.map(item => {
      const node = {
        isCheck: false,
        title: diets[item],
        key: item
      };
      array.push(node);
    });
    this.setState({ DietFood: array });
  }

  componentDidUpdate = prev => {
    const {
      userData,
      searchResult,
      navigation,
      isFamilyUpdate,
      isProfileUpdate,
      family,
      profileData,
      errorProfile,
      userStatusRequest
    } = this.props;
    const { searchTxt } = this.state;

    if (errorProfile && errorProfile != prev.errorProfile) {
      console.log(errorProfile);
    }

    if (this.isTrue(isFamilyUpdate) && isFamilyUpdate != prev.isFamilyUpdate && this.isObjectAvailable(family)) {
      var user = userData;
      const { family_members } = user;
      if (this.isObjectAvailable(family_members)) {
        user.family_members.adult = family.adult;
        user.family_members.child = family.child;
        updateUserProfile(user);
      }
    }

    if (this.isTrue(isProfileUpdate) && isProfileUpdate != prev.isProfileUpdate && this.isObjectAvailable(profileData)) {
      const { access_token } = userData;
      const user = {
        ...profileData,
        access_token
      };

      updateUserProfile(user);
      userStatusRequest({
        access_token,
        version: VersionNumber.appVersion
      });

      const pushAction = StackActions.push({
        routeName: "Main"
      });
      navigation.dispatch(pushAction);
    }

    if (searchResult != undefined && typeof searchResult == "object" && searchTxt.length > 1) {
      var array = [];
      searchResult.map((itm, ind) => {
        array.push(itm);
      });
      if (JSON.stringify(array) != JSON.stringify(this.state.searchResult)) {
        this.setState({ searchResult: array });
      }
    }
  };

  onBtnForward = () => {
    const { index, isSwipeEnable } = this.state;

    if (index == 0) {
      this.updateFamily(true);
      return;
    } else if (index >= 4) {
      return;
    }

    if (isSwipeEnable) {
      this.swiperRef.scrollTo(index + 1, true);
      this.setState({ index: index + 1 });
    } else {
      constants.DropDownAlert.showDropdownAlert(
        "error",
        "Family Member",
        `Please select at least one adult and one child`
      );
    }
  };

  onBtnBackward = () => {
    const { index } = this.state;

    if (index > 0) {
      this.swiperRef.scrollTo(index - 1, true);
      this.setState({ index: index - 1 });
    }
  };

  onSearch = text => {
    const { searchInspirationRequest, userData } = this.props;
    const params = {
      access_token: userData.access_token,
      name: text,
      limit: '20'
    };

    if (
      text &&
      text.length > 1 &&
      userData.access_token != undefined
    ) {
      this.setState({ searchTxt: text });
      searchInspirationRequest(params);
    }
  }

  onPressAdult = index => {
    this.setState({
      isSwipeEnable: true,
      adultNumber: index + 1
    });
  }

  onPressChild = index => {
    this.setState({
      isSwipeEnable: true,
      childNumber: index + 1
    });
  }

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

  onResult = ingredients => {
    this.setState({ ingredients });
  }

  onPressDot = i => {
    this.swiperRef.scrollTo(i, true);
    this.setState({ index: i });
  }

  searchAllergy = searchTxt => {
    var array = [];
    searchTxt = searchTxt.toLowerCase();
    this.state.allergyFood.map((mapItm, mapIndex) => {
      var titleTxt = mapItm.title.toLowerCase();
      if (titleTxt.includes(searchTxt)) {
        array.push(mapItm);
      }
    });
    this.setState({ allergyFoodFilter: array });
  };

  updateFamily = isNav => {
    const { setFamilyRequest, userData } = this.props;
    const { adultNumber, childNumber, index } = this.state;
    console.log(childNumber);
    if (userData != undefined && Object.keys(userData).length > 0) {
      setFamilyRequest({
        adult: adultNumber,
        child: childNumber,
        access_token: userData.access_token
      });

      if (isNav) {
        this.swiperRef.scrollTo(index + 1, true);
        this.setState({ index: index + 1 });
      }
    } else {
      constants.DropDownAlert.showDropdownAlert(
        "error",
        "Family Member",
        `Please select at least one adult and one child`
      );
    }
  };

  updateProfile = selectedGearsIDsObject => {
    const { updateProfileRequest, userData } = this.props;
    const { access_token } = userData;
    const { DietFood, allergyFood } = this.state;

    if (!access_token) return;

    var dietArray = [];
    var allergyArray = [];
    DietFood.map((item, index) => {
      if (item.isCheck) dietArray.push(item.key);
      if (index == DietFood.length - 1 && dietArray.length == 0) {
        dietArray.push(DietFood[0].key);
      }
    });
    allergyFood.map((item, index) => {
      if (item.isCheck) allergyArray.push(item.key);
    });
    const params = {
      access_token: userData.access_token,
      diet: dietArray,
      allergies: allergyArray,
      ...selectedGearsIDsObject
    };
    updateProfileRequest(params);
  };

  render() {
    const { navigation, isSearching } = this.props;
    const {
      index,
      isSwipeEnable,
      fullName,
      DietFood,
      allergyFood,
      ingredients,
      searchResult,
    } = this.state;

    return (
      <BaseView>
        <Header
          title="Parameter mon profil"
          navigation={navigation}
        />
        <View style={styles.title}>
          <AvoText
            style={styles.swiperDescTitle}
            fontWeight="museo"
            text={index < 4 ? "Bonjour !" : "Presque fini!"}
          />
        </View>
        <Swiper
          ref={ref => (this.swiperRef = ref)}
          loop={false}
          scrollEnabled={isSwipeEnable}
          showsButtons={false}
          showsPagination={false}
          scrollEnabled={false}
          onIndexChanged={indChange => {
            this.setState({ index: indChange });
            if (indChange == 0 || indChange == 1) {
              this.updateFamily(false);
            }
          }}
          buttonWrapperStyle={styles.buttonWrapperStyle}
          dot={<View style={styles.circle} />}
          activeDot={<View style={styles.bigCircle} />}
          style={styles.wrapper}
        >
          <View style={styles.wrapperHCenter}>
            <Household
              onPressAdult={index => this.onPressAdult(index)}
              onPressChild={index => this.onPressChild(index)}
            />
          </View>
          <View style={styles.wrapperHCenter}>
            <Diet
              onPress={(itm, ind) => {
                DietFood.map((im, inmInd) => {
                  DietFood[inmInd].isCheck = false;
                });
                DietFood[ind].isCheck = !DietFood[ind].isCheck;
                this.setState({ food: DietFood });
              }}
              food={DietFood}
            />
          </View>
          <View style={styles.wrapperHCenter}>
            <Allergy
              title={`As-tu des allergies ? On va éviter les recettes qui font mal …`}
              allergyFood={allergyFood}
              onPress={this.onPressAllergy}
            />
          </View>
          <View style={styles.wrapperHCenter}>
            <Ingredient
              title={`Pas de ça dans mon plat ! Indiquez les ingrédients que vous n'aimez pas.`}
              searchResult={searchResult}
              isWaiting={isSearching}
              ingredients={ingredients}
              isRegistration
              onSearch={text => this.onSearch(text)}
              onResult={this.onResult}
            />
          </View>
          <View style={styles.wrapperHCenter}>
            <Kitchen
              isRegistration
              onConfirm={selectedGearsIDsObject => this.updateProfile(selectedGearsIDsObject)}
            />
          </View>
        </Swiper>
        <View style={styles.footer}>
          <View style={{ flexDirection: "row", width: constants.screen.width / 3 }}>
            {
              index > 0 &&
              <TouchableOpacity
                onPress={() => this.onBtnBackward()}
              >
                <AvoText style={styles.back} text="Passer" />
              </TouchableOpacity>
            }
            <View style={styles.wrapperCenter} />
          </View>
          <View style={styles.wrapperCenter}>
            <Dots
              index={index}
              onPressDot={this.onPressDot}
            />
          </View>
          <View style={{ flexDirection: "row", width: constants.screen.width / 3 }} >
            <View style={styles.wrapperCenter} />
            {
              index < 4 &&
              <TouchableOpacity
                onPress={() => this.onBtnForward()}
              >
                <AvoText style={styles.forward} text="Suivant" />
              </TouchableOpacity>
            }
          </View>
        </View>
      </BaseView>
    );
  }
}
const mapStateToProps = state => {
  const { auth, inspiration, profile } = state.reducer;
  const { userData } = auth;
  const { error, profileData, isFamilyUpdate, isProfileUpdate, family } = profile;

  return {
    isWaiting: auth.isWaiting,
    id: auth.id,
    error: auth.eMessage,
    userData,
    isSearching: inspiration.isLoading,
    searchResult: inspiration.searchResult,
    profileData,
    isFamilyUpdate,
    isProfileUpdate,
    family,
    errorProfile: error
  };
};

const mapDispatchToProps = {
  updateUserProfile,
  userStatusRequest,
  updateProfileRequest,
  setFamilyRequest,
  searchInspirationRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
