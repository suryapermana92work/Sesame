// Home Page

import React from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity, BackHandler } from "react-native";
import { StackActions } from 'react-navigation';

import BaseComponent from '../base';
import { BaseView, Header, AvoText } from "../../components";
import { ImageBgBottom, IconMinusGreen, IconPlusGreen, IconSqureUnchecked, IconSqureChecked } from "../../assets/svg";

import { autoLoginRequest } from "../../actions/authActions";
import { generateMenuRequest } from '../../actions';

import { Storage } from '../../Utilities';
import styles from "./styles";
import constants from "../../const";

class Home extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      popupCount: 1,
      isGenerateRequest: false,
      profileUrl: "",
      isSameMenu: false,
      useOriginIngredients: false
    };
  }

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    const { userData } = this.props;
    const { draft_plan } = userData;

    if (!this.isAuthenticated()) return;
    if (this.isObjectAvailable(draft_plan)) {
      this.setState({ isSameMenu: true });
    } else {
      this.setState({ isSameMenu: false });
    }
    
    const lastMealGenerateNumber = await Storage.getItem("last_meal_plan_number");
    console.log(lastMealGenerateNumber);
    if (lastMealGenerateNumber) this.setState({ popupCount: parseInt(lastMealGenerateNumber) });
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentDidUpdate(prevProps) {
    const { profileData } = this.props;

    if (profileData != prevProps.profileData) {
      const { draft_plan } = profileData;
      if (this.isObjectAvailable(draft_plan)) {
        this.setState({ isSameMenu: true });
      } else {
        this.setState({ isSameMenu: false });
      }
    }
  }

  handleBackButton = () => {
    return true;
  }

  autoLoginCheck = (token, access_token) => {
    const { autoLoginRequest } = this.props;
    const params = { token, access_token };
    autoLoginRequest(params);
  };

  getMenu = () => {
    const { navigation, userData, profileData, generateMenuRequest } = this.props;
    const { popupCount, useOriginIngredients } = this.state;

    Storage.setItem("last_meal_plan_number", popupCount);

    if (useOriginIngredients) {
      navigation.dispatch(StackActions.push({
        routeName: "MyFridge",
        params: { popupCount }
      }));
    } else {
      const { access_token } = userData;
      const params = {
        access_token,
        nb_meal: popupCount,
      }
      generateMenuRequest(params);
      navigation.dispatch(StackActions.push({
        routeName: "MenuHome",
        params: { id: 0 }
      }));
    }

    setTimeout(() => {
      const { draft_plan } = profileData;
      if (this.isObjectAvailable(draft_plan)) {
        this.setState({ isSameMenu: true });
      } else {
        this.setState({ isSameMenu: false });
      }
    }, 1000);
  };

  onSameMenu = () => {
    const { navigation } = this.props;
    navigation.dispatch(StackActions.push({
      routeName: "MenuHome",
      params: { id: 2 }
    }));
  }

  render() {
    const { navigation } = this.props;
    const { profileUrl, popupCount, isSameMenu, useOriginIngredients } = this.state;

    return (
      <BaseView>
        <Header
          profileUrl={profileUrl}
          title="Bienvenue"
          navigation={navigation}
        />
        <View style={constants.styles.wrapperCenter}>
          {
            isSameMenu ?
              <View style={constants.styles.wrapperCenter}>
                <AvoText
                  style={styles.descTxt}
                  fontWeight="bold"
                  numberOfLines={2}
                  text="Voulez-vous commencer avec le même menu que la dernière fois ?"
                />
                <View style={[constants.styles.row, { width: '90%' }]}>
                  <TouchableOpacity
                    style={styles.nonButton}
                    activeOpacity={0.8}
                    onPress={() => this.setState({ isSameMenu: false })}
                  >
                    <AvoText
                      style={styles.nonText}
                      text="Non"
                    />
                  </TouchableOpacity>
                  <View style={{ width: 20 }} />
                  <TouchableOpacity
                    style={styles.ouiButton}
                    activeOpacity={0.8}
                    onPress={() => this.onSameMenu()}
                  >
                    <AvoText
                      style={styles.ouiText}
                      text="Oui"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              :
              <View style={constants.styles.wrapperCenter}>
                <AvoText
                  style={styles.title}
                  fontWeight="museo"
                  text="Planifier mes repas"
                />
                <AvoText
                  style={styles.descTxt}
                  fontWeight="normal"
                  text="Combien de plats souhaites-tu préparer"
                />
                <View style={[constants.styles.row, { width: "80%", marginBottom: 10, marginTop: 20 }]}>
                  <View style={styles.popupContainer}>
                    <TouchableOpacity
                      style={styles.mathBtn}
                      onPress={() => this.setState({ popupCount: popupCount > 0 ? popupCount - 1 : 0 })}
                    >
                      <IconMinusGreen />
                    </TouchableOpacity>
                    <AvoText
                      style={styles.counterStyle}
                      fontWeight="museo"
                      text={popupCount.toString()}
                    />
                    <TouchableOpacity
                      style={styles.mathBtn}
                      onPress={() => this.setState({ popupCount: popupCount + 1 })}
                    >
                      <IconPlusGreen />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={() => this.getMenu()}
                  >
                    <AvoText
                      style={{ fontSize: 16, color: "white" }}
                      fontWeight="normal"
                      text={`C'est parti !`}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.check}
                  activeOpacity={0.9}
                  onPress={() => this.setState({ useOriginIngredients: !useOriginIngredients })}
                >
                  {useOriginIngredients ? <IconSqureChecked /> : <IconSqureUnchecked />}
                  <AvoText
                    style={styles.checkText}
                    text="je veux utiliser des ingrédients que j'ai déjà"
                  />
                </TouchableOpacity>
              </View>
          }
          {/* <ImageBgBottom
            width={constants.screen.width * 0.6}
            style={styles.bottomImage}
          /> */}
        </View>
      </BaseView>
    );
  }
}

const mapDispatchToProps = {
  generateMenuRequest,
  autoLoginRequest
};

const mapStateToProps = state => {
  const { auth, profile, menu } = state.reducer;
  const { profileData } = profile;
  const { isLoading, isMenuGenerated, errorMessage } = menu;

  return {
    isWaiting: auth.isWaiting,
    accessToken: auth.accessToken,
    id: auth.id,
    error: auth.eMessage,
    userData: auth.userData,
    isLoading,
    isMenuGenerated,
    profileData,
    generateError: errorMessage
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
