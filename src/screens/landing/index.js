import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, TouchableOpacity, SafeAreaView, View } from 'react-native';
import { StackActions } from 'react-navigation';

import { BaseView, Header, AvoText, AvoButton } from "../../components";

import { styles } from './styles';

const Landing = ({ navigation }) => {

  onBtnLogin = () => {
    const pushAction = StackActions.push({
      routeName: "Login",
      params: { id: 0 }
    });
    navigation.dispatch(pushAction);
  }

  onBtnSignUp = () => {
    const pushAction = StackActions.push({
      routeName: "Login",
      params: { id: 1 }
    });
    navigation.dispatch(pushAction);
  }

  return (
    <BaseView>
      <Image
        style={styles.bg}
        source={require('../../assets/png/background.jpg')}
        resizeMode='cover'
      />
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/png/sesame_logo.png')}
          resizeMode='stretch'
        />
        <TouchableOpacity
          style={styles.connexion}
          activeOpacity={0.9}
          onPress={() => onBtnLogin()}
        >
          <AvoText
            style={styles.connexionTitle}
            fontWeight='bold'
            text='CONNEXION'
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inscription}
          activeOpacity={0.9}
          onPress={() => onBtnSignUp()}
        >
          <AvoText
            style={styles.inscriptionTitle}
            fontWeight='bold'
            text='INSCRIPTION'
          />
        </TouchableOpacity>
      </View>
    </BaseView>
  )
}

export default Landing;