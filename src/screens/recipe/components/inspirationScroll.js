// InspirationScroll Component

import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Text, Button } from 'react-native';

import BaseComponent from '../../base';
import { InspirationHBar } from '../../../components/inspiration';
import { AvoCard } from '../../../components';

import { getInspirationRequest, likeDislikeRecRequest } from '../../../actions';

import constants from '../../../const';
import Animated from 'react-native-reanimated';

class InspirationScroll extends BaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isRefresh: false,
      isReload: false,
    }
  }

  componentDidMount() {
    const { inspirationsObject } = this.props;

    if (this.isObjectAvailable(inspirationsObject)) {
      this._setup(inspirationsObject);
      return;
    }

    constants.showLoader.showLoader();

    this._refresh();
  }

  componentDidUpdate = (prevProps) => {
    const { inspirationsObject, isWaiting } = this.props;
    const { isRefresh } = this.state;

    if (isRefresh && !isWaiting && isWaiting != prevProps.isWaiting) {
      if (this.isObjectAvailable(inspirationsObject)) {
        this.setState({ isRefresh: false });
        this._setup(inspirationsObject);
      }
      return;
    }

    if (inspirationsObject != prevProps.inspirationsObject) {
      this._setup(inspirationsObject);
      constants.showLoader.hideLoader();
    }
  };

  /*
  ** Setup UI with inspirations
  */
  _setup = inspirationsObject => {
    if (!this.isObjectAvailable(inspirationsObject)) return;

    const { data, isReload } = this.state;
    const { recipes } = inspirationsObject;
    var array = isReload ? [] : [...data];

    recipes.map(item => {
      array.push(item);
    });

    if (JSON.stringify(data) != JSON.stringify(array)) {
      this.setState({ data: array });
    }
    this.setState({ isReload: false });
  }

  /*
  ** Refresh inspirations
  */
  _refresh = () => {
    const { userData, getInspirationRequest } = this.props;
    const { access_token } = userData;
    const params = { access_token };
    getInspirationRequest(params);
  }

  /*
  ** Refresh inspirations
  */
  _loadMore = () => {
    const { userData, getInspirationRequest } = this.props;
    const { access_token } = userData;
    const { data } = this.state;
    var blacklist = {};

    data.map((item, index) => {
      blacklist[`blacklist[${index}]`] = item.uid;
    })

    const params = {
      access_token,
      ...blacklist
    };
    getInspirationRequest(params);
  }

  /*
  ** Pull down to refresh
  */
  onRefresh = () => {
    this.setState({ isRefresh: true, isReload: true });
    this._refresh();
  }

  /*
  ** Pull up to load more
  */
  onEndReached = () => {
    const { isRefresh, data } = this.state;
    if (!isRefresh && data.length > 5) {
      this.setState({ isRefresh: true });
      this._loadMore();
    }
  }

  /* This method is called when user swipes left card. It performs 'unlike'
  ** Params - item (card data), index (index of card)
  */
  onSwipeLeft = (item, index) => {
    const { likeDislikeRecRequest, userData, getInspirationRequest } = this.props;
    const { data } = this.state;
    const { access_token } = userData;
    const { uid } = item;

    var params = {
      access_token,
      typeUrl: 1,
      uid
    };
    console.log(params);
    likeDislikeRecRequest(params);

    var array = [...data];
    array.splice(index, 1);
    this.setState({ data: array });

    if (array.length < 1) {
      params = { access_token };
      getInspirationRequest(params);
    }
  };

  /* This method is called when user swipes right card. It performs 'like'
  ** Params - item (card data), index (index of card)
  */
  onSwipeRight = (item, index) => {
    const { likeDislikeRecRequest, userData, getInspirationRequest } = this.props;
    const { data } = this.state;
    const { access_token } = userData;
    const { uid } = item;

    var params = {
      access_token,
      typeUrl: 0,
      uid
    };
    likeDislikeRecRequest(params);

    var array = [...data];
    array.splice(index, 1);
    this.setState({ data: array });

    if (array.length < 1) {
      params = { access_token };
      getInspirationRequest(params);
    }
  };

  /*
  ** Render Footer
  */
  renderFooter = () => {
    const { isRefresh } = this.state;
    if (isRefresh) {
      return <ActivityIndicator />
    } else {
      return null;
    }
  }

  /* 
  ** Render Item
  */
  renderItem = ({ item, index }) => {
    const { navigation } = this.props;

    return (
       <InspirationHBar
          key={index}
          navigation={navigation}
          item={item}
          onScrollLeftEnd={() => this.onSwipeLeft(item, index)}
          onScrollRightEnd={() => this.onSwipeRight(item, index)}
        />
       )
  }

  render() {
    const { data, isRefresh } = this.state;

    return (
      <FlatList
        style={{ backgroundColor: 'transparent' }}
        data={data}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => String(index)}
        onRefresh={this.onRefresh}
        refreshing={isRefresh}
        ListFooterComponent={this.renderFooter}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={1.5}
      />
    )
  }

}

const mapDispatchToProps = {
  getInspirationRequest,
  likeDislikeRecRequest
};

const mapStateToProps = state => {
  const { auth, inspiration } = state.reducer;
  const { inspirationsObject, isLoadingInspiration } = inspiration;

  return {
    isWaiting: isLoadingInspiration,
    error: auth.eMessage,
    userData: auth.userData,
    inspirationsObject,
    isRecipeStatusUpdate: auth.isRecipeStatusUpdate
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InspirationScroll);