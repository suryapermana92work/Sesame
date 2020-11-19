import { StyleSheet } from 'react-native';

import constants from '../../const';

export const styles = StyleSheet.create({
  container: {
		flex: 1,
    alignItems: 'center'
	},
  button: {
    width: constants.screen.width * 0.9,
    height: 50,
    marginBottom: 20
  },
  content: {
    flex: 1,
    width: constants.screen.width - 40,
    marginVertical: 40
  },
  title: {
    fontSize: 18
  },
  list: {
    flex: 1,
    padding: 20,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    margin: 10
  },
  itemTitle: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center'
  }
});