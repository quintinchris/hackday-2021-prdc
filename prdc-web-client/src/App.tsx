import React from 'react';
import logo from './logo.svg';
import './App.css';
import { App_Props, App_State, Message } from './objects/Data';
import CMessage from './components/CMessage';
import { mockMessages, mockUser } from './mock/MockAppData';
import MockApiClient from './mock/MockApiClient';

import "./bootstrap.min.css";
import "./index.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CActions from './components/CActions';

class App extends React.Component<App_Props, App_State> {
	state: App_State = {
		currentMessages: [
			{
				text: `Welcome to the ticket manager`,
				fromUser: false,
				senderName: `Ticket Robot 🤖`,
				timeSent: new Date(),
				title: `Welcome`
			},
			...mockMessages
		],
		user: mockUser,
		apiClient: new MockApiClient()
	}

	addMessage(newMessage: Message): void {
		this.state.currentMessages.push(newMessage);
		this.setState({
			currentMessages: this.state.currentMessages
		});
	}

	render() {
		return (
			<Container>
				{
					this.state.currentMessages.map((message: Message) => {
						return (
							<>
								<Row className="WideCenterRow">
									<Col>
										<CMessage message={message} 
											user={this.state.user} 
											apiClient={this.state.apiClient}
										/>
									</Col>
								</Row>
							</>
						)})
				}
				<>
					<Row className="WideCenterRow">
						<Col className="PaddedActions">
							<CActions 
								user={this.state.user} 
								apiClient={this.state.apiClient} 
								responseCallback={this.addMessage}
							/>
						</Col>
					</Row>
				</>
			</Container>
		);
	}
}

/*function App() {
	return (
		<div className="App">
			
		</div>
	);
}*/

export default App;
