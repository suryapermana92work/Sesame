import { StyleSheet } from 'react-native';

import constants from '../../const';

export const styles = StyleSheet.create({
  bannerContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: constants.screen.width * 0.625 + 40,
  },
  banner: {
    width: '100%',
    height: constants.screen.width * 0.625,
    backgroundColor: constants.colors.bg
  },
  back: {
    ...constants.styles.centerHV,
    padding: 5,
    alignSelf: 'flex-start',
    marginLeft: 8
  },
  profileImage: {
    position: 'absolute',
    width: 80,
    height: 80,
    right: 20,
    bottom: 0,
    borderRadius: 40
  },
  profileContainer: {
    width: '100%',
    height: constants.screen.height - constants.screen.width * 0.625 - 40,
    marginTop: 20,
    paddingHorizontal: 20
  },
  profileName: {
    fontSize: 20
  },
  profileLink: {
    textDecorationLine: 'underline',
    marginVertical: 10
  }
});