import { StyleSheet } from 'react-native';

import constants from '../../const';

export const styles = StyleSheet.create({
  container: {
    ...constants.styles.wrapperHVCenter,
  },
  desc: {
    fontSize: 16,
    width: '50%',
    textAlign: 'center'
  },
  pear: {
    width: constants.screen.width * 0.5,
    height: constants.screen.width * 0.5,
  },
  upgrade: {
    width: '80%',
    height: 50,
    margin: 50
  }
});