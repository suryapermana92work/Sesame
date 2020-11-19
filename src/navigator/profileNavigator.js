// Home Navigation

import { createStackNavigator } from 'react-navigation-stack';

import Profile from '../screens/profile';
import ProfileHome from '../screens/profileHome';
import ProfileHabit from '../screens/profileHabit';
import ProfileAllergy from '../screens/profileAllergy';
import ProfileIngredient from '../screens/profileIngredient';
import ProfileKitchen from '../screens/profileKitchen';
import Contact from '../screens/contact';
import profileUpdate from '../screens/profile/profileUpdate';

const ProfileStackNavigator = createStackNavigator(
  {
    Profile: {
      screen: Profile
    },
    ProfileHome: {
      screen: ProfileHome
    },
    ProfileHabit: {
      screen: ProfileHabit
    },
    ProfileAllergy: {
      screen: ProfileAllergy
    },
    ProfileIngredient: {
      screen: ProfileIngredient
    },
    ProfileKitchen: {
      screen: ProfileKitchen
    },
    Contact: {
      screen: Contact
    },
    ProfileUpdate:{
      screen:profileUpdate
    },
  }, {
    initialRouteName: 'Profile',
    defaultNavigationOptions: {
      headerShown: false,
    }
  }
)

ProfileStackNavigator.navigationOptions = ({ navigation }) => {
	let tabBarVisible = true;
	if (navigation.state.index > 0) {
	  tabBarVisible = false;
	}
	return { tabBarVisible };
};

export default ProfileStackNavigator;