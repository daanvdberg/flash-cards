import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import DeckViewComponent from './containers/DeckView';
import DeckComponent from './containers/Deck';
import AddQuestionComponent from './containers/AddQuestion';
import QuizComponent from './containers/Quiz';
import CreateDeckComponent from './containers/CreateDeck';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const DeckViewStack = createStackNavigator(
	{
		DeckView: DeckViewComponent,
		Deck: DeckComponent,
		AddQuestion: AddQuestionComponent,
		Quiz: QuizComponent
	},
	{
		defaultNavigationOptions: {
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: 'teal',
			},
			headerTitleStyle: {
				color: 'white'
			}
		}
	}
);
const CreateDeckStack = createStackNavigator(
	{
		CreateDeck: CreateDeckComponent
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: 'teal',
			},
			headerTitleStyle: {
				color: 'white'
			}
		}
	} );

const DrawerNav = createMaterialBottomTabNavigator(
	{
		DeckView: {
			screen: DeckViewStack,
			navigationOptions: {
				title: 'My Decks',
				tabBarIcon: ({ tintColor }) => (
					<MaterialCommunityIcons name='cards' size={ 24 } color={ tintColor } />
				)
			}
		},
		CreateDeck: {
			screen: CreateDeckStack,
			navigationOptions: {
				title: 'New Deck',
				tabBarIcon: ({ tintColor }) => (
					<MaterialIcons name='add-box' size={ 24 } color={ tintColor } />
				)
			}
		},
	},
	{
		shifting: true,
		initialRouteName: 'DeckView',
		activeColor: 'white',
		inactiveColor: 'rgba(255, 255, 255, 0.6)',
		barStyle: { backgroundColor: 'teal' },
	}
);

export default AppContainer = createAppContainer( DrawerNav );