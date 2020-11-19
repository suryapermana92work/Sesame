import { StyleSheet } from 'react-native';

import constants from '../../const';

export const styles = StyleSheet.create({
  container: {
    ...constants.styles.wrapper,
    padding: 20
  },
  title: {
    fontSize: 18,
    textAlign: 'center'
  },
  list: {
    flex: 1,
    width: '100%',
    marginTop: 70
  },
  item: {
    paddingHorizontal: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  check: {
    width: 25,
    height: 25,
    marginRight: 10
  }
});