import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, TouchableOpacity, SafeAreaView, View } from 'react-native';

import Base from "../../components/base";
import { BaseView, Header, AvoText, AvoButton } from "../../components";

import { styles } from './styles';

const UpdateReminder = ({ navigation }) => {

  onBtnUpgrade = () => {
    navigation.pop();
  }

  return (
    <Base>
      <Header
        title="Mise à jour"
        navigation={navigation}
      />
      <View style={styles.container}>
        <AvoText
          style={styles.desc}
          fontWeight='bold'
          text='Nous avons travaillé dur !  Découvrez les nouvelles fonctionnalités Sésame en téléchargeant notremise à jour. '
        />
        <Image
          style={styles.pear}
          source={require('../../assets/png/pears.png')}
          resizeMode='stretch'
        />
        <AvoButton
          style={styles.upgrade}
          title="Mettre à jour Sésame"
          onPress={() => onBtnUpgrade()}
        />
      </View>
    </Base>
  )
}

export default UpdateReminder;