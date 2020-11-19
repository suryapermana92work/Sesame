// Styles

import { StyleSheet } from 'react-native';
import constants from '../../const';
import { getStatusBarHeight } from '../../Utilities';

const statusHeight =
	Platform.OS == 'ios'
		? constants.isIphoneX ? getStatusBarHeight() * 1.5 + 51 : getStatusBarHeight() / 1.5 + 51
		: getStatusBarHeight() / 2 + 51;

const styles = StyleSheet.create({
	container: {
		width: constants.screen.width * 0.9,
		alignSelf: 'center',
		paddingVertical: 20
	},
	borderLine: {
		borderBottomColor: constants.colors.separator,
		borderBottomWidth: 1,
		marginTop: 5,
		marginBottom: 10
	},
	title: {
		fontSize: constants.sizes.TXT_SIZE,
		marginBottom: 16
	},
	item: {
		marginBottom: 24,
		alignItems: 'center',
		alignSelf: 'center',
		width: '90%'
	},
	itemTitle: {
		flex: 1,
		marginLeft: 10,
		fontSize: 14, //constants.sizes.TXT_SIZE
	},
	itemStrokeTitle: {
		flex: 1,
		marginLeft: 10,
		fontSize: 14, //constants.sizes.TXT_SIZE,
		textDecorationLine: 'line-through'
	},
	itemValue: {
		fontSize: 14, //constants.sizes.TXT_SIZE,
		color: constants.colors.placeholder
	},
	validateButton: {
		width: '90%',
		alignSelf: 'center',
		borderWidth: 1,
		borderColor: constants.colors.tint,
		marginTop: 10,
		marginBottom: 30
	},
	orderButton: {
		width: '90%',
		marginTop: 30,
		alignSelf: 'center'
	},
	block: {
		width: '85%',
		alignSelf: 'center'
	},
	category: {
		marginBottom: 15,
		borderRadius: 10,
		backgroundColor: 'white',
		padding: 10,
		shadowColor: 'black',
		shadowOpacity: 0.1,
		shadowOffset: {
			x: 0,
			y: 5
		},
		shadowRadius: 5,
	},
	categoryTitle: {
		fontSize: 14
	},
	checkbox: {
		width: '100%',
		backgroundColor: constants.colors.lightTint
	},
	check: {
		width: '100%',
		height: 50,
		...constants.styles.row,
		...constants.styles.centerHV,
	},
	checkTitle: {
		color: 'white',
		fontSize: 18,
		marginRight: 10
	},
	header: {
		width: '85%',
		alignSelf: 'center',
		paddingVertical: 20,
		...constants.styles.row
	},
	sliderWrapper: {
		position: 'absolute',
		width: constants.screen.width,
		height: constants.screen.height,
		backgroundColor: 'transparent',
		top: 0,
		left: 0,
		zIndex: 1,
		alignItems: 'center'
	},
	sliderContainer: {
		alignItems: 'center', 
		backgroundColor: 'white', 
		borderRadius: 10,
		width: '90%',
		padding: 20,
		shadowColor: 'black',
		shadowOpacity: 0.1,
		shadowOffset: {
			x: 0,
			y: 5
		},
		shadowRadius: 5,
		marginTop: statusHeight + 15
	},
	performButton: {
		height: 40,
		width: '100%',
		backgroundColor: constants.colors.lightTint,
		borderRadius: 10,
		marginVertical: 10,
		...constants.styles.centerHV
	},
	sliderItem: {
		alignItems: 'center',
		padding: 10
	},
	sliderItemText: {
		textAlign: 'center',
		marginTop: 10
	},
	season: {
    backgroundColor: constants.colors.greenBg,
    paddingHorizontal: 5,
    paddingVertical: 2,
		fontSize: 12,
		color: 'white',
		borderRadius: 4,
		overflow: 'hidden'
  }
});

export default styles;
