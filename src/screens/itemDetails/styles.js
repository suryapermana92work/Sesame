// Styles

import React from 'react';
import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from '../../Utilities';
import constants from '../../const';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white' 
  },
  scrollContainer: {
    backgroundColor: 'white',
    width: constants.screen.width,
    alignSelf: 'center'
  },
  headerContainer: {
    height: constants.screen.width / 1.4, 
    backgroundColor: 'white'
  },
  header: {
    position: 'absolute',
		top: 0,
		zIndex: 10,
		left: -2,
		width: constants.screen.width + 4,
		height: constants.isIphoneX ? (constants.screen.width + 4) * 0.251 : (constants.screen.width + 4) * 0.193,
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 20,
		paddingTop: constants.isIphoneX ? 24 : Platform.OS == 'ios' ? 10 : 5
  },
  headerButtonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  navContainer: {
		width: constants.screen.width,
		paddingTop: Platform.OS === 'android' ? 5 : getStatusBarHeight(),
		paddingHorizontal: 10
  },
  scroll: {
    position: 'absolute',
    top: 0,
    height: constants.screen.height
  },
  content: {
    width: constants.screen.width,
    backgroundColor: '#fff',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    paddingTop: 13,
    marginTop: constants.screen.width / 1.4 - 35,
    paddingHorizontal: 20
  },
  timeline: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Gotham-Book',
    fontWeight: '300',
    marginTop: -10
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    width: constants.screen.width,
    backgroundColor: constants.colors.bg
  },
  bg: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: constants.screen.width + 4,
		height: constants.isIphoneX ? (constants.screen.width + 4) * 0.251 : (constants.screen.width + 4) * 0.193
  },
  rowContainerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  rowContainerCenter: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		backgroundColor: constants.colors.bg
	},
  boxContainer: {
		justifyContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'center',
		width: (constants.screen.width - 66) / 3,
		backgroundColor: constants.colors.bg,
		height: (constants.screen.width - 66) / 3 * 0.7
  },
  boxContainer_1: {
		justifyContent: 'space-around',
		alignItems: 'center',
    paddingVertical: 15,
		width: (constants.screen.width - 53) / 2,
		backgroundColor: constants.colors.bg,
		height: (constants.screen.width - 66) / 3 * 0.7
  },
  descTxt: { 
    fontSize: constants.sizes.TXT_SIZE + 2, 
    marginHorizontal: 10, 
    marginTop: 15, 
    color: 'black' 
  },
	descTxtTitle: { 
    fontSize: 18, 
    marginVertical: 10, 
    color: 'black' 
  },
  tag: {
    borderRadius: 5,
    backgroundColor: constants.colors.greenBg,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  ingrTxt: {
		fontSize: 12,
		color: 'white'
	},
  flexTxtLight: { 
    fontSize: 14, 
    color: constants.colors.placeholder 
  },
  flexTxt: { 
    fontSize: 14, 
    color: 'black', 
    flex: 1, 
    marginHorizontal: 10 
  },
  title: { 
    color: 'black', 
    fontSize: 18 
  },
  borderStyle: { 
    width: '100%', 
    borderColor: constants.colors.borderColor, 
    borderTopWidth: 0.5, 
    marginVertical: 10 
  },
  ratingItem: {
    marginTop: 10
  },
  ratingName: {
    marginRight: 5,
    marginBottom: 5
  },
  reportWrapper: {
    position: 'absolute',
    width: constants.screen.width,
    height: constants.screen.height,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    top: 0,
    left: 0,
    ...constants.styles.centerHV
  },
  reportContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: constants.screen.width * 0.8,
    alignSelf: 'center',
    padding: 15
  },
  reportItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40
  },
  reportItemText: {
    fontSize: 16,
    marginLeft: 10
  },
  reportButton: {
    backgroundColor: constants.colors.pink,
    borderRadius: 4,
    width: '40%',
    height: 40,
    ...constants.styles.centerHV
  },
  reportButtonTitle: {
    color: 'white',
    fontSize: 14
  },
  reportCancelButton: {
    backgroundColor: constants.colors.grey,
    borderRadius: 4,
    width: '40%',
    height: 40,
    ...constants.styles.centerHV
  },
  reportComment: {
    width: '100%',
    height: 70,
    fontSize: 12,
    backgroundColor: constants.colors.bg,
    padding: 10,
    borderRadius: 5,
    textAlignVertical: 'top'
  },
  reportConfirm: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 15
  },
  reportConfirmTitle: {
    fontSize: 20,
    marginVertical: 10
  },
  reportConfirmText: {
    textAlign: 'center'
  },
  // Comment
  commentInput: {
    flex: 1,
    backgroundColor: constants.colors.bg,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 10,
    marginRight: 10
  },
  commentText: {
    paddingHorizontal: 10,
    marginRight: 10
  },
  // Profile
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 10,
    backgroundColor: constants.colors.bg
  },
  // Event
  eventCircle: {
    width: 20,
    height: 20,
  },
  season: {
    backgroundColor: constants.colors.greenBg,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    marginRight: 5,
    color: 'white',
    overflow: 'hidden'
  }
});

export default styles;