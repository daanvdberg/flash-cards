import React, { Component } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { Constants, Font } from 'expo';
import configureStore from './redux/store';
import AppContainer from './AppNavigator';
import { Provider } from 'react-redux';
import { receiveDecks } from './redux/actions/decks';
import { getDecks } from './utils/_DATA';
import getTheme from './native-base-theme/components';
import { StyleProvider } from 'native-base';
import flashCards from './native-base-theme/variables/flashCards';
import { Notifications } from 'expo';
import { setLocalNotification } from './utils/helpers'

const store = configureStore();

function AppStatusBar ({ backgroundColor, ...props }) {
	return (
		<View style={ { backgroundColor, height: Constants.statusBarHeight } }>
			<StatusBar
				translucent
				backgroundColor={ backgroundColor }
				{ ...props }
			/>
		</View>
	);
}

export default class App extends Component {

	async componentDidMount() {
		await Font.loadAsync({
			'Roboto': require('native-base/Fonts/Roboto.ttf'),
			'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
		});
		getDecks().then((res) => store.dispatch(receiveDecks(res)));

		setLocalNotification();
	}

	render () {
		return (
			<Provider store={ store }>
				<StyleProvider  style={getTheme(flashCards)}>
					<View style={ { flex: 1 } }>
						<AppStatusBar backgroundColor='teal' barStyle='light-content' />
						<AppContainer />
					</View>
				</StyleProvider>
			</Provider>
		);
	}
}

const styles = StyleSheet.create( {
	container: {
		backgroundColor: 'hsl(0, 0%, 97%)'
	}
} );
