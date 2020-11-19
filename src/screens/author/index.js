import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, TouchableOpacity, SafeAreaView, View, ScrollView, Linking } from 'react-native';

import BaseView from '../../components/base';
import { IconBack } from '../../assets/svg';
import { AvoText } from '../../components';

import { styles } from './styles';

const Author = ({ navigation }) => {
  const author = navigation.state.params.author;

  onLink = link => {
    Linking.openURL(link);
  }

  return (
    <BaseView>
      <View style={styles.bannerContainer}>
        <Image
          style={styles.banner}
          source={{ uri: author.banner }}
        />
        <Image
          style={styles.profileImage}
          source={{ uri: author.image }}
        />
        <View style={styles.profileContainer}>
          <AvoText
            style={styles.profileName}
            fontWeight="bold"
            text={author.name}
          />
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => onLink(author.website)}
          >
            <AvoText
              style={styles.profileLink}
              text={author.website}
            />
          </TouchableOpacity>
          <ScrollView>
            <AvoText
              text={author.bio}
            />
          </ScrollView>
        </View>
      </View>
      <SafeAreaView>
        <TouchableOpacity
          style={styles.back}
          activeOpacity={0.9}
          onPress={() => navigation.pop()}
        >
          <IconBack width={45} height={45} />
        </TouchableOpacity>
      </SafeAreaView>
    </BaseView>
  )
}

export default Author;