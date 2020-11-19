// Inspiration

import React from 'react';
import { View } from 'react-native';

import BaseComponent from '../../base';
import InspirationScroll from './inspirationScroll';

import styles from "./styles";

class Inspiration extends BaseComponent {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <InspirationScroll navigation={navigation} />
      </View>
    );
  }
}

export default Inspiration;
