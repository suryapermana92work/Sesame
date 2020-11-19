// Recipe screen

import React from 'react';
import { connect } from 'react-redux';
import { View, StatusBar, SafeAreaView, Keyboard } from 'react-native';

import BaseView from '../../components/base';
import { Header, Inspiration, Favorite } from './components';

import { searchInspirationRequest } from '../../actions/inspiration';
import styles from './components/styles';

class Recipe extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      index: 0
    }
  }

  onFocusSearch = () => {
    this.setState({ isSearching: true });
  }

  onChangeSearchText = text => {
    const { searchInspirationRequest, userData } = this.props;
    const { access_token } = userData;
    const params = {
      access_token,
      name: text,
      limit: '20'
    };

    if (text && text.length > 1 && access_token != undefined) {
      searchInspirationRequest(params);
    }
  }

  /*
  ** This method is called when user taps masked view while searching
  */
  onTapCoveredView = () => {
    this.setState({ isSearching: false });
    Keyboard.dismiss();
  }

  /*
  ** Tap Search
  */
  onSearch = () => {
    this.props.navigation.navigate('Search');
  }

  render() {
    const { navigation } = this.props;
    const { index } = this.state;

    return (
      <BaseView>
        <Header
          onSearch={() => this.onSearch()}
          onTapInspiration={() => this.setState({ index: 0 })}
          onTapFavorite={() => this.setState({ index: 1 })}
        />
        <View style={styles.container}>
          {
            index == 0 ?
              <Inspiration navigation={navigation} />
              :
              <Favorite navigation={navigation} />
          }
        </View>
      </BaseView>
    );
  }

}

const mapDispatchToProps = {
  searchInspirationRequest,
};

const mapStateToProps = state => {
  const { auth, inspiration } = state.reducer;

  return {
    userData: auth.userData,
    isWaitingSearchResult: inspiration.isLoading,
    searchResult: inspiration.searchResult,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);