import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { saveQuestionToDeck } from '../redux/actions/decks';
import { connect } from 'react-redux';

class AddQuestion extends Component {

	static navigationOptions = {
		headerTitle: 'Add Question'
	};

	state = {
		front: '',
		back: ''
	};

	handleChangeText = (side) => (input) => this.setState( () => ({ [side]: input }));

	addQuestion = () => {
		const { navigation, dispatch } = this.props;
		const title = navigation.getParam( 'deckID' );
		dispatch( saveQuestionToDeck( title, { question: this.state.front, answer: this.state.back } ) );
		this.setState(() => ({
			front: '',
			back: ''
		}), () => navigation.goBack());
	};

	render () {
		const { front, back } = this.state;
		return (
			<Container style={ styles.container }>
				<Content>
					<Form>
						<Item floatingLabel>
							<Label>Question</Label>
							<Input
								onChangeText={ this.handleChangeText('front') }
								value={ front }
							/>
						</Item>
						<Item floatingLabel last>
							<Label>Answer</Label>
							<Input
								onChangeText={ this.handleChangeText('back') }
								value={ back }
							/>
						</Item>
						<Button
							full
							style={{ marginTop: 30 }}
							onPress={this.addQuestion}
							disabled={ !front || !back }
						>
							<Text>Add Question</Text>
						</Button>
					</Form>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create( {
	container: {
		padding: 20
	}
} );

export default connect()(AddQuestion);