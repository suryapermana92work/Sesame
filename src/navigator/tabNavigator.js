// Tab Navigator

import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeStackNavigator from './homeStackNavigator';
import MenuStackNavigator from './menuStackNavigator';
import RecipeStackNavigator from './recipeStackNavigator';
import ProfileStackNavigator from './profileNavigator';

import {
	IconUtensilActive,
	IconUtensil,
	IconBroccoli,
	IconBroccoliGrey,
} from '../assets/svg';

import constants from '../const';

const TabNavigator = createBottomTabNavigator(
	{
		Menu: {
			screen: HomeStackNavigator,
			navigationOptions: {
				title: "Je plannifie",
				tabBarIcon: ({ focused }) => <Icon name='shopping-cart' size={26} color={focused ? constants.colors.tint : constants.colors.grey} />
			}
		},
		Recipes: {
			screen: RecipeStackNavigator,
			navigationOptions: {
				title: "Recettes",
				tabBarIcon: ({ focused }) =>
					focused ? <IconBroccoli width={16} height={20} /> : <IconBroccoliGrey width={16} height={20} />
			}
		},
		Cook: {
			screen: MenuStackNavigator,
			navigationOptions: {
				title: "Mes menus",
				tabBarIcon: ({ focused }) =>
					focused ? <IconUtensilActive width={18} height={20} /> : <IconUtensil width={18} height={20} />
			}
		},
		Profile: {
			screen: ProfileStackNavigator,
			navigationOptions: {
				title: "Profil",
				tabBarIcon: ({ focused }) => <Icon name='user-circle' size={26} color={focused ? constants.colors.tint : constants.colors.grey} />
			}
		},
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({}),
		swipeEnabled: false,
		animationEnabled: false	,
		tabBarOptions: {
			activeTintColor: constants.colors.tint,
			inactiveTintColor: constants.colors.grey,
			style: {
				borderTopColor: 'transparent',
				borderTopLeftRadius: 25,
				borderTopRightRadius: 25,
				paddingVertical: 5,
				paddingTop: 10
			}
		}
	}
);

export default TabNavigator;
