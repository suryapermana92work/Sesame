import React from "react";
import { connect } from "react-redux";
import { TouchableOpacity, View, ScrollView, SafeAreaView, Modal } from "react-native";
import AwesomeAlert from 'react-native-awesome-alerts';
import VersionNumber from 'react-native-version-number';
import Icon from 'react-native-vector-icons/FontAwesome';

import BaseComponent from '../base';
import { BaseView, Header, AvoText, AvoButton } from "../../components";
import { IconEuro, IconEuroGrey, IconLeaf, IconLeafGrey, IconPig, IconPigGrey } from "../../assets/svg";

import {
  getMenuIndRequest,
  validatePlanRequest,
  userStatusRequest,
  getCurrentPlanRequest,
  updateProfileRequest
} from "../../actions";

import styles from "./styles";
import constants from "../../const";

class Course extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      grocery: {},
      isRefresh: true,
      isShownAlert: false,
      isShownPreference: false,
      noOrder: false,
      checkedNumber: 0,
      sliderNumber: -1
    };
  }

  componentDidMount() {
    const { userData, profileData, getMenuIndRequest } = this.props;
    const { access_token } = userData;
    const { shopping_preference } = profileData;
    const params = { access_token };
    getMenuIndRequest(params);
    this.setState({ sliderNumber: shopping_preference == null ? -1 : shopping_preference });
  }

  componentDidUpdate = prevProp => {
    const { isValidated, userData, menuIngredients, navigation, getCurrentPlanRequest } = this.props;
    const { noOrder } = this.state;

    if (menuIngredients != prevProp.menuIngredients &&
      this.isObjectAvailable(menuIngredients)
    ) {
      const { ingredients } = menuIngredients;
      var object = {};

      ingredients.map((item) => {
        const { id, aisle, text, name, quantity, unit, in_season } = item;

        if (aisle in object) {
          object[aisle].push({
            id,
            isChecked: false,
            name,
            text,
            quantity,
            unit,
            in_season
          });
        } else {
          object[aisle] = [];
          object[aisle].push({
            id,
            isChecked: false,
            name,
            text,
            quantity,
            unit,
            in_season
          });
        }
      });
      this.setState({ grocery: object });
      this.countCheckNumber(object);
    }

    if (isValidated && isValidated != prevProp.isValidated) {
      const { access_token } = userData;
      userStatusRequest({
        access_token,
        version: VersionNumber.appVersion
      });

      if (noOrder) {
        constants.showLoader.hideLoader();
        getCurrentPlanRequest({ access_token });
        navigation.navigate('Home');
        navigation.navigate('Cook');
        this.setState({ noOrder: false });
      }
    }
  };

  countCheckNumber = object => {
    var checkedNumber = 0;

    Object.keys(object).map(categoryName => {
      object[categoryName].map(node => {
        const { isChecked } = node;
        if (!isChecked) checkedNumber += 1;
      });
    });
    this.setState({ checkedNumber });
  }

  onTapGrocery = index => {
    const { grocery } = this.state;
    var array = grocery;
    var item = array[index];
    item.isChecked = !item.isChecked;
    array[index] = item;
    this.setState({ grocery: array });
  };

  onConfirmButton = () => {
    const { navigation } = this.props;
    const { grocery } = this.state;
    var array = [];

    Object.keys(grocery).map(categoryName => {
      grocery[categoryName].map(item => {
        if (item.isChecked) array.push(item);
      });
    });

    navigation.navigate('Delivery', { grocery: array });
    this.setState({ isShownAlert: false });
  }

  onOrderButton = () => {
    const { navigation } = this.props;
    const { grocery } = this.state;
    var array = [];

    Object.keys(grocery).map(categoryName => {
      grocery[categoryName].map(item => {
        if (item.isChecked) array.push(item);
      });
    });

    if (array.length > 0) {
      this.setState({ isShownAlert: true });
    }
  }

  onValidateButton = () => {
    const { userData, validatePlanRequest } = this.props;
    const { access_token } = userData;

    validatePlanRequest({ access_token });
    this.setState({ noOrder: true });

    constants.showLoader.showLoader();
  }

  onPressSliders = () => {
    const { isShownPreference } = this.state;
    this.setState({ isShownPreference: !isShownPreference });
  }

  onPressPerform = () => {
    const { userData, updateProfileRequest, userStatusRequest } = this.props;
    const { access_token } = userData;
    const { sliderNumber } = this.state;
    const params = { 
      access_token, 
      shopping_preference: sliderNumber == -1 ? null : sliderNumber
    };
    updateProfileRequest(params);

    setTimeout(() => {
      userStatusRequest({ access_token });
    }, 500);

    this.setState({ isShownPreference: false });
  }

  renderSliders = () => {
    const { isShownPreference, sliderNumber } = this.state;

    return (
      <Modal
        visible={isShownPreference}
        transparent
      >
        <View style={styles.sliderWrapper}>
          <View style={styles.sliderContainer}>
            <AvoText
              fontWeight='bold'
              text="Vous êtes plutôt..."
            />
            <TouchableOpacity
              style={styles.sliderItem}
              activeOpacity={0.9}
              onPress={() => this.setState({ sliderNumber: 0 })}
            >
              {
                sliderNumber == 0 ?
                  <IconEuro width={40} height={40} />
                  :
                  <IconEuroGrey width={40} height={40} />
              }
              <AvoText
                style={styles.sliderItemText}
                text={`Meilleur rapport\nqualité prix`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sliderItem}
              activeOpacity={0.9}
              onPress={() => this.setState({ sliderNumber: 1 })}
            >
              {
                sliderNumber == 1 ?
                  <IconLeaf width={40} height={40} />
                  :
                  <IconLeafGrey width={40} height={40} />
              }
              <AvoText
                style={styles.sliderItemText}
                text="Bio"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sliderItem}
              activeOpacity={0.9}
              onPress={() => this.setState({ sliderNumber: 2 })}
            >
              {
                sliderNumber == 2 ?
                  <IconPig width={40} height={40} />
                  :
                  <IconPigGrey width={40} height={40} />
              }
              <AvoText
                style={styles.sliderItemText}
                text="Le moins cher"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.performButton}
              activeOpacity={0.9}
              onPress={this.onPressPerform}
            >
              <AvoText
                style={{ color: 'white', fontSize: 16 }}
                fontWeight="bold"
                text="Je valide mes préférences"
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  renderValidateButton = () => {
    const { navigation } = this.props;
    const { grocery } = this.state;

    if (Object.keys(grocery).length == 0) return <View />;

    return (
      <AvoButton
        isNegative
        style={styles.validateButton}
        title="Je valide mon menu"
        onPress={() => this.onValidateButton()}
      />
    );
  }

  renderOrderButton = () => {
    const { navigation } = this.props;
    const { grocery } = this.state;

    if (Object.keys(grocery).length == 0) return <View />;

    return (
      <AvoButton
        style={styles.orderButton}
        title="Commander les ingrédients"
        onPress={() => this.onOrderButton()}
      />
    );
  }

  renderItems = (item, index, categoryName) => {
    var object = this.state.grocery;
    const { id, isChecked, name, text, quantity, unit, in_season } = item;
    const itemValue = `${quantity} ${unit}`;

    return (
      <TouchableOpacity
        key={id}
        style={[constants.styles.row, styles.item]}
        activeOpacity={0.9}
        onPress={() => {
          var ingredient = item;
          ingredient.isChecked = !ingredient.isChecked;
          var category = object[categoryName];
          category[index] = ingredient;
          object[categoryName] = category;
          this.setState({ grocery: object });
          this.countCheckNumber(object);
        }}
      >
        {
          isChecked ?
            <Icon name='times-circle' size={20} color="grey" />
            :
            <Icon name='check-circle' size={20} color={constants.colors.lightTint} />
        }
        <AvoText
          style={isChecked ? styles.itemStrokeTitle : styles.itemTitle}
          fontWeight='light'
          text={text}
        />
        {
          in_season == 1 &&
          <AvoText
            style={styles.season}
            text="De saison"
          />
        }
      </TouchableOpacity>
    );
  }

  renderCategory = categoryName => {
    const { grocery } = this.state;
    const array = grocery[categoryName];

    return (
      <View style={styles.block}>
        <View style={styles.category}>
          <AvoText
            style={styles.categoryTitle}
            fontWeight='bold'
            text={categoryName}
          />
        </View>
        {
          array.map((item, index) => this.renderItems(item, index, categoryName))
        }
      </View>
    )
  }

  render() {
    const { grocery, isShownAlert, checkedNumber } = this.state;

    return (
      <BaseView>
        <Header title="Courses" navigation={this.props.navigation} isBack />
        <View style={constants.styles.wrapper}>
          <ScrollView>
            <View style={styles.header}>
              <AvoText
                style={{ flex: 1 }}
                fontWeight='museo'
                text={`Un dernier coup d’oeil sur\nma liste de course...`}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.onPressSliders()}
              >
                <Icon name="sliders" size={25} color={constants.colors.grey} />
              </TouchableOpacity>
            </View>
            {
              Object.keys(grocery).map(categoryName => this.renderCategory(categoryName))
            }
            {this.renderOrderButton()}
            {this.renderValidateButton()}
          </ScrollView>
          {
            checkedNumber > 0 &&
            <View style={styles.checkbox}>
              <SafeAreaView>
                <View style={styles.check}>
                  <AvoText
                    style={styles.checkTitle}
                    fontWeight='bold'
                    text={`${checkedNumber} articles sélectionnés`}
                  />
                  <Icon name="shopping-cart" size={25} color="white" />
                </View>
              </SafeAreaView>
            </View>
          }
          {this.renderSliders()}
        </View>
        <AwesomeAlert
          show={isShownAlert}
          showProgress={false}
          title=""
          message="La commande des ingrédients est en cours de développement. Merci de bien vérifier votre panier avant de passer la commande !"
          messageStyle={{
            fontFamily: 'Gotham-Book'
          }}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor={constants.colors.tint}
          confirmButtonStyle={{
            width: 60,
            alignItems: 'center'
          }}
          confirmButtonTextStyle={{
            fontFamily: 'Gotham-Book'
          }}
          onConfirmPressed={() => this.onConfirmButton()}
        />
      </BaseView>
    );
  }
}

const mapDispatchToProps = {
  getMenuIndRequest,
  validatePlanRequest,
  userStatusRequest,
  getCurrentPlanRequest,
  updateProfileRequest
};

const mapStateToProps = state => {
  const { auth, menu, profile } = state.reducer;
  const { userData } = auth;
  const { profileData} = profile;
  const { menuIngredients, isLoading, isValidated, errorMessage } = menu;

  return {
    isLoading,
    isValidated,
    userData,
    profileData,
    menuIngredients,
    errorMessage
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Course);
