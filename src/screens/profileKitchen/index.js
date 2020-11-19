import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, TouchableOpacity, SafeAreaView, View } from 'react-native';

import Base from "../../components/base";
import { BaseView, Header, AvoText, AvoButton } from "../../components";
import Kitchen from './ketchen';

import { styles } from './styles';

const ProfileKitchen = ({ navigation }) => {
  return (
    <Base>
      <Header
        title="Dans ma cuisine..."
        navigation={navigation}
        isBack
      />
      <Kitchen
        isRegistration={false}
        onConfirm={() => navigation.pop()}
      />
    </Base>
  );
};

export default ProfileKitchen;