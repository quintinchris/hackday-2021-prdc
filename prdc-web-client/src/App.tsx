import React from 'react';
import logo from './logo.svg';
import './App.css';
import { App_Props, App_State, Message } from './objects/Data';
import CMessage from './components/CMessage';

class App extends React.Component<App_Props, App_State> {
	state: App_State = {
		currentMessages: [
			{
				content: `Welcome to the ticket manager`,
				fromUser: false,
				senderName: `Ticket Robot 🤖`,
				timeSent: new Date(),
				title: `Welcome`
			}
		]
	}

	render() {
		return (
			<div>
				{
					this.state.currentMessages.map((message: Message) => {
						return (
							<>
								<CMessage message={message}/>
							</>
						)
					})
				}
				<CActions/>
			</div>
		);
	}
}

/*function App() {
	return (
		<div className="App">
			
		</div>
	);
}

export default App;*/
