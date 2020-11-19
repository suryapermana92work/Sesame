// Styles

import { StyleSheet } from 'react-native';

import constants from '../../const';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20
	},
	buttonPopNag: {
		width: '90%',
		alignSelf: 'center',
		marginVertical: 5
	},
	buttonPop: {
		width: '90%',
		alignSelf: 'center',
		marginVertical: 5
	},
	popupTxt: {
		fontSize: 15,
		color: 'black',
		textAlign: 'center',
		marginVertical: 15,
		width: '70%'
	},
	card: {
		width: constants.screen.width * 0.9,
		borderRadius: 5,
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		padding: 20,
		marginVertical: 20
	},
	profileIamge: {
		width: constants.screen.width * 0.2,
		height: constants.screen.width * 0.2,
		borderRadius: 50,
		backgroundColor: 'grey',
		marginRight: 20
	},
	name: {
		fontSize: constants.sizes.BTN_TXT_SIZE,
		marginBottom: 3,
		color: constants.colors.tint
	},
	email: {
		fontSize: constants.sizes.INPUT_TXT_SIZE - 1,
		color: 'black'
	},
	info: {
		...constants.styles.center,
		marginVertical: constants.isIphoneX ? 20 : 20
	},
	infoText: {
		fontSize: 12,
		color: constants.colors.placeholder
	},
	dialogWrapper: {
		position: 'absolute',
		width: constants.screen.width,
		height: constants.screen.height,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		top: 0,
		left: 0,
		...constants.styles.centerHV,
		zIndex: 1
	},
	dialogContainer: {
		alignItems: 'center', 
		backgroundColor: 'white', 
		borderRadius: 10,
		width: '80%',
		paddingBottom: 10
	}
});

export default styles;
