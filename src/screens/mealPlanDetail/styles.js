import { StyleSheet } from 'react-native';

import constants from '../../const';

export const styles = StyleSheet.create({
  level: {
    alignSelf: "center",
    marginVertical: 20,
    fontSize: 18
  },
  recipes: {
    alignSelf: 'center'
  },
  recipe: {
    width: (constants.screen.width * 0.8 - 40) / 3,
    alignItems: 'center',
    padding: 5
  },
  nutrition: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    borderRadius: 10,
    marginVertical: 15,
    shadowColor: 'black',
		shadowOpacity: 0.1,
		shadowOffset: {
			width: 0,
			height: 3
		},
    shadowRadius: 5,
    elevation: 1,
    backgroundColor: constants.colors.bg,
    ...constants.styles.row
  },
  nutritionBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  nutritionItem: {
    marginBottom: 10,
    ...constants.styles.wrapper
  },
  bar: {
    width: "75%",
    height: 20,
    borderRadius: 10,
    backgroundColor: constants.colors.grey
  },
  activeBar: {
    height: 20,
    borderRadius: 10,
    justifyContent: 'center'
  },
  env: {
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 20,
    width: '100%'
  },
  separate: {
    height: 0.5,
    backgroundColor: 'gray',
    marginVertical: 20
  },
  currency: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: 'black',
		shadowOpacity: 0.1,
		shadowOffset: {
			width: 0,
			height: 3
		},
    shadowRadius: 5,
    paddingHorizontal: 20,
    elevation: 1,
    backgroundColor: constants.colors.bg,
    ...constants.styles.row
  }
});