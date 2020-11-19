// Home Navigation

import { createStackNavigator } from 'react-navigation-stack';

import Recipe from '../screens/recipe';
import ItemDetails from '../screens/itemDetails';
import RecipeType from '../screens/inspiration/recipeType';
import Search from '../screens/search';
import Author from '../screens/author';

const RecipeStackNavigator = createStackNavigator(
  {
    Recipe: {
      screen: Recipe
    },
    RecipeItemDetails: {
      screen: ItemDetails
    },
    RecipeType: {
      screen: RecipeType
    },
    Search: {
      screen: Search
    },
    Author: {
      screen: Author
    }
  }, {
    initialRouteName: 'Recipe',
    defaultNavigationOptions: {
      headerShown: false,
    }
  }
);

RecipeStackNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return { tabBarVisible };
}

export default RecipeStackNavigator;