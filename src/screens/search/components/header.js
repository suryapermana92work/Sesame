import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, TouchableOpacity, SafeAreaView, StatusBar, Keyboard } from 'react-native';
import { StackActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';

import { AvoSearch } from '../../../components';
import { Tags } from './tags';

import { cleanSearchRecipeRequest } from '../../../actions';

import { styles } from './styles';
import constants from '../../../const';

export const Header = (props) => {

  const dispatch = useDispatch();
  const clean = () => dispatch(cleanSearchRecipeRequest());

  onFocus = () => {

  }

  onChangeText = text => {
    props.onChangeText(text);
  }

  onEndEditing = () => {

  }

  onFilter = () => {
    Keyboard.dismiss();
    props.onFilter();
  }

  onRemoveTags = index => {
    props.onRemoveTags(index);
  }

  onPressBack = () => {
    clean();
    props.navigation.dispatch(StackActions.pop())
  }

  return (
    <View style={styles.header}>
      <SafeAreaView>
        <StatusBar barStyle='dark-content' />
        <View style={constants.styles.wrapperRowCenter}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => onPressBack()}
          >
            <Icon name="arrow-left" size={20} color='black' />
          </TouchableOpacity>
          <View style={constants.styles.wrapper}>
            <AvoSearch
              autoFocus
              isWaiting={props.isWaiting}
              placeholder="Rechercher dans mon livre de recettes"
              returnKeyType='search'
              onFocus={onFocus}
              onChangeText={(text) => onChangeText(text)}
              onEndEditing={onEndEditing}
            />
          </View>
          <TouchableOpacity
            style={styles.back}
            onPress={onFilter}
          >
            <Icon name="filter" size={20} color='black' />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Tags 
        keywords={props.keywords}
        onRemoveTags={onRemoveTags}
      />
    </View>
  );
}