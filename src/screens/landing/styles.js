import { StyleSheet } from 'react-native';

import constants from '../../const';

export const styles = StyleSheet.create({
  container: {
    ...constants.styles.wrapperHVCenter,
  },
  bg: {
    position: 'absolute',
    top: 0, 
    left: 0,
    width: constants.screen.width,
    height: constants.screen.height
  },
  button: {
    width: '90%',
    marginBottom: 10
  },
  logo: {
    width: constants.screen.width * 0.4,
    height: constants.screen.width * 0.44
  },
  connexion: {
    width: '80%',
    height: 60,
    marginTop: constants.screen.height * 0.1,
    borderRadius: 20,
    backgroundColor: 'rgb(107, 207, 41)',
    ...constants.styles.centerHV
  },
  connexionTitle: {
    fontSize: 20,
    color: 'white'
  },
  inscription: {
    width: '80%',
    height: 60,
    borderRadius: 20,
    backgroundColor: 'white',
    marginTop: 20,
    ...constants.styles.centerHV
  },
  inscriptionTitle: {
    fontSize: 20
  },
});