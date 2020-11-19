import { StyleSheet } from 'react-native';

import constants from '../../const';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    width: constants.screen.width - 40,
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: 'black',
		shadowOpacity: 0.1,
		shadowOffset: {
			x: 0,
			y: 5
		},
		shadowRadius: 5,
  },
  filterContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: constants.screen.width,
    height: constants.screen.height,
    backgroundColor: constants.colors.modal,
    zIndex: 1,
    ...constants.styles.centerHV,
  },
  filterContent: {
    width: '90%',
    height: '80%',
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 20
  },
  filterButton: {
    width: constants.screen.width * 0.9 - 40,
    alignContent: 'center'
  },
  filterCancel: {
    ...constants.styles.centerHV,
    height: 40,
    marginVertical: 10
  },
  cancel: {
    fontSize: 16,
    color: constants.colors.grey
  },
  reglime: {
    paddingVertical: 20,
    borderTopWidth: 0.5,
    borderTopColor: constants.colors.grey,
    borderBottomWidth: 0.5,
    borderBottomColor: constants.colors.grey
  },
  dietIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 10
  },
  timeEditor: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: constants.colors.border,
    marginVertical: 10
  },
  plus: {
    ...constants.styles.centerHV,
    width: 40,
    height: 40
  },
  image: {
    width: constants.screen.width - 40,
    height: (constants.screen.width - 40) * 0.4,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: constants.colors.separator
  },
  title: {
    fontSize: 16,
    padding: 10
  }
});