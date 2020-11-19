// Delivery screen

import React from 'react';
import { connect } from 'react-redux';
import { View, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import BaseComponent from '../base';
import { BaseView, Header } from '../../components';
import { SearchBox, CheckBox, Switch, DeliveryOption } from './components';

import { 
  getStoresRequest, 
  createCartRequest, 
  searchAddressRequest,
  validatePlanRequest,
  userStatusRequest
} from '../../actions';

import styles from './styles';
import constants from '../../const';

class Delivery extends BaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      stores: [],
      option: 0, 
      addresses: [],
      address: "",
      features: [],
      grocery: props.navigation.state.params.grocery,
      isChecked: false
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('@isStoredAddress', (error, result) => {
      if (error) {
        console.log(error);
        return;
      }

      const isChecked = JSON.parse(result);
      if (!this.isValueAvailable(isChecked)) return;

      this.setState({ isChecked });

      if (!isChecked) return;

      AsyncStorage.getItem("@deliveryAddress", (err, object) => {
        if (err) {
          console.log(err);
          return;
        }
        const feature = JSON.parse(object);

        if (!this.isObjectAvailable(feature)) return;

        const { label, lat, lon } = feature;
        this.setState({ 
          address: label, 
          latitude: lat, 
          longitude: lon 
        });
      });
    });
  }

  componentDidUpdate(prevProps) {
    const { isLoading, stores, cart, collection, isValidated, userData } = this.props;
    const { option } = this.state;

    if (isLoading) {
      constants.showLoader.showLoader();
    } else {
      constants.showLoader.hideLoader();
    }

    if (stores != prevProps.stores && this.isObjectAvailable(stores)) {
      const { drive, delivery } = stores;
      
      if (option) {
        this.setState({ stores: delivery });
      } else {
        this.setState({ stores: drive });
      }
    }
    
    if (this.isObjectAvailable(cart) && cart != prevProps.cart) {
      const { basket_url } = cart;
      if (this.isStringAvailable(basket_url)) {
        Linking.openURL(basket_url);
      }
    }

    if (this.isArrayAvailable(collection) && collection != prevProps.collection) {
      var array = [];
      collection.map(item => {
        const { label } = item;
        if (this.isStringAvailable(label)) {
          array.push(label);
        }
      });
      this.setState({ addresses: array, features: collection });
    }

    // if (isValidated && isValidated != prevProps.isValidated) {
    //   const { access_token } = userData;
    //   userStatusRequest({ access_token });
    // }
  }

  onChangeSearchText = address => {
    this.setState({ value: address });
    const { userData, searchAddressRequest } = this.props;
    const { access_token } = userData;
    searchAddressRequest({ access_token, address });
  }

  onAddress = i => {
    const { userData, getStoresRequest } = this.props;
    const { features, isChecked } = this.state;
    const { access_token } = userData;
    const feature = features[i];
    const { label, lat, lon } = feature;
    const params = { access_token, lat, lon };

    getStoresRequest(params);
    this.setState({ address: label, longitude: lon, latitude: lat });

    if (isChecked) {
      AsyncStorage.setItem('@deliveryAddress', JSON.stringify(feature));
    }
  }

  onSearch = () => {
    const { userData, getStoresRequest } = this.props;
    const { latitude, longitude, isChecked } = this.state;
    const { access_token } = userData;
    const params = {
      access_token,
      lat: latitude,
      lon: longitude,
    };
    getStoresRequest(params);
  }

  onCheck = () => {
    const { isChecked } = this.state;

    this.setState({ isChecked: !isChecked });
    AsyncStorage.setItem("@isStoredAddress", JSON.stringify(!isChecked)); 
  }

  onSwitch = index => {
    const { stores } = this.props;

    this.setState({ option: index });

    if (!this.isObjectAvailable(stores)) return;

    const { drive, delivery } = stores;
    if (index) {
      this.setState({ stores: delivery });
    } else {
      this.setState({ stores: drive });
    }
  }

  onChooseDeliveryType = store => {
    const { userData, createCartRequest, validatePlanRequest } = this.props;
    const { address } = this.state;
    const { id } = store;
    const { access_token } = userData;
    const params = {
      access_token,
      store_id: id,
      address
    };
    console.log(params);
    createCartRequest(params);
    // validatePlanRequest({ access_token });
  }

  render() {
    const { navigation } = this.props;
    const { option, addresses, stores, isChecked } = this.state;

    return (
      <BaseView>
        <Header title="Ma Livraison" navigation={navigation} isBack />

        <View style={styles.container}>
          <CheckBox
            isChecked={isChecked}
            onCheck={this.onCheck}
          />
          <Switch onSwitch={index => this.onSwitch(index)} />
          <DeliveryOption
            stores={stores}
            option={option ? 'Drive' : 'Livraison'}
            onChooseDeliveryOption={this.onChooseDeliveryType}
          />
          <SearchBox
            address={addresses}
            onChangeText={this.onChangeSearchText}
            onAddress={this.onAddress}
            onSearch={this.onSearch}
          />
        </View>
      </BaseView>
    );
  }

}

const mapDispatchToProps = {
  getStoresRequest,
  createCartRequest,
  searchAddressRequest,
  validatePlanRequest,
  userStatusRequest
};

const mapStateToProps = state => {
  const { auth, delivery, menu } = state.reducer;
  const { isLoading, collection } = delivery;
  const { userData } = auth;
  const { isValidated } = menu;

  return {
    isLoading,
    stores: delivery.stores,
    cart: delivery.cart,
    collection,
    userData,
    isValidated
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);