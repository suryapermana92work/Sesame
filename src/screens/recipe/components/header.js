// Header component

import React from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { AvoText } from '../../../components';

import constants from '../../../const';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      index: 0
    }
  }

  onTapInspiration = () => {
    this.setState({ index: 0 });
    this.props.onTapInspiration();
  }

  onTapFavorite = () => {
    this.setState({ index: 1 });
    this.props.onTapFavorite();
  }

  render() {
    const { index } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView>
          <StatusBar barStyle='dark-content' />
          <View style={constants.styles.wrapperRowCenter}>
            <AvoText
              style={styles.title}
              fontWeight='museo'
              text="Mes recettes"
            />
            <View style={constants.styles.wrapper} />
            <TouchableOpacity
              style={styles.search}
              onPress={() => this.props.onSearch()}
            >
              <Icon name="search" size={20} color={constants.colors.tint} />
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            <View style={{ flex: 0.5 }} />
            <View style={constants.styles.wrapperCenter}>
              <TouchableOpacity
                style={[styles.button, index == 0 && styles.buttonBorder]}
                onPress={() => this.onTapInspiration()}
              >
                <AvoText
                  style={styles.buttonTitle}
                  fontWeight='bold'
                >
                  Inspiration
                </AvoText>
              </TouchableOpacity>
            </View>
            <View style={constants.styles.wrapperCenter}>
              <TouchableOpacity
                style={[styles.button, index == 1 && styles.buttonBorder]}
                onPress={() => this.onTapFavorite()}
              >
                <AvoText
                  style={styles.buttonTitle}
                  fontWeight='bold'
                >
                  Favoris
                </AvoText>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.5 }} />
          </View>
        </SafeAreaView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 2.62,
    elevation: 4,
  },
  title: {
    fontSize: 30,
    marginHorizontal: 5,
    color: constants.colors.tint,
    marginLeft: 32
  },
  search: {
    marginRight: 16,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  button: {
    paddingTop: 20,
    paddingBottom: 10
  },
  buttonTitle: {
    color: constants.colors.tint,
    fontSize: 14
  },
  buttonBorder: {
    borderBottomColor: constants.colors.tint,
    borderBottomWidth: 2,
  }
});

export default Header;