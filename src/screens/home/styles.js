// Styles

import { StyleSheet, Platform } from 'react-native';

import constants from '../../const';

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20
	},
	title: {
		fontSize: constants.sizes.TITLE_SIZE,
		color: constants.colors.tint,
		marginTop: 30
	},
	descTxt: {
		width: constants.screen.width * 0.9,
		alignSelf: 'center',
		fontSize: constants.sizes.TXT_SIZE,
		color: 'black',
		textAlign: 'center',
		marginVertical: 30
	},
	button: {
		width: '48%'
	},
	counterStyle: {
		fontSize: constants.sizes.BTN_TXT_SIZE,
		flex: 4,
		color: 'black',
		textAlign: 'center',
		alignSelf: 'center',
	},
	mathBtn: { 
		flex: 1, 
		alignItems: 'center', 
		justifyContent: 'center', 
		padding: 12 
	},
	btnStyle: {
		height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: constants.colors.tint,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: 'transparent',
    shadowColor: constants.colors.tint,
    shadowOpacity: 0.5,
    shadowOffset: {
      x: 0,
      y: 5
    },
		shadowRadius: 5,
		paddingHorizontal: 20
	},
	popupRowControl: {
		width: '80%',
		borderRadius: 5,
		marginTop: 30,
		marginVertical: 10,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row'
	},
	popupContainer: {
		flex: 1,
		flexDirection: 'row',
    height: 46,
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 0,
    borderColor: constants.colors.border,
    backgroundColor: 'white'
	},
	bottomImage: {
		position: "absolute",
		bottom: 2,
		right: constants.screen.width * 0.1
	},

	nonButton: {
		...constants.styles.centerHV,
		flex: 1,
		height: 40,
		borderColor: constants.colors.borderColor,
		borderRadius: 5,
		borderWidth: 1
	},
	nonText: {
		color: constants.colors.placeholder,
		fontSize: 16
	},
	ouiButton: {
		...constants.styles.centerHV,
		flex: 1,
		height: 40,
		borderRadius: 5,
		backgroundColor: constants.colors.tint
	},
	ouiText: {
		color: 'white',
		fontSize: 16
	},
	check: {
		width: '80%',
		marginTop: 5,
		...constants.styles.row
	},
	checkText: {
		marginLeft: 10
	}
});

export default styles;
