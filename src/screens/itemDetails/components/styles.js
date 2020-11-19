// Styles

import { StyleSheet } from 'react-native';
import constants from '../../../const';

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20
  },
  dish: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginLeft: 10,
    ...constants.styles.centerHV
  }
});

export default styles;