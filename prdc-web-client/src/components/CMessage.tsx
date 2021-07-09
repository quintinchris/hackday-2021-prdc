import { CMessage_State, CMessage_Props, JiraTicket } from "../objects/Data";
import React from 'react';
import Toast from 'react-bootstrap/Toast'
import CTicketDisplay from "./CTicketDisplay";
import "../index.css";

class CMessage extends React.Component<CMessage_Props, CMessage_State> {
	state: CMessage_State = {
		visible: true
	}
	
	setVisibility(newVisible: boolean): void {
		this.setState({
			visible: newVisible
		});
	}

	getMessageAgeMins(): number {
		const currTimeMs: number = new Date().getTime();
		const sentTimeMs: number = this.props.message.timeSent.getTime();

		const diffMin: number = Math.round((currTimeMs - sentTimeMs) / (1000 * 60));
		return diffMin;
	}

	getMessageTitleClassName(): string {
		return `mr-auto ${this.props.message.fromUser ? `UserMessageTitle` : ``}`;
	}

	render() {
		/*{this.props.messageContent.title ? <h4>{this.props.messageContent.title}</h4> : ""}
			<p>{this.props.messageContent.messageMarkdown}</p> */

		return (
			<>
				<Toast className="WideCenterToast" show={this.state.visible} 
					onClose={() => this.setVisibility(false)} animation={true}
				>
					<Toast.Header>
						<strong className={this.getMessageTitleClassName()}>
							{this.props.message.senderName}
							{this.props.message.fromUser ? ` (you)` : ``}
						</strong>
						<small>{this.getMessageAgeMins()} min. ago</small>
					</Toast.Header>
					<Toast.Body>
						<p>{this.props.message.text}</p>
						{
							this.props.message.tickets ? 
								this.props.message.tickets.map((ticket: JiraTicket) => {
									return <CTicketDisplay 
										ticket={ticket} 
										user={this.props.user} 
										apiClient={this.props.apiClient}
									/>;
							}) : ``
						}
					</Toast.Body>
				</Toast>
			</>
		);
	}
}

export default CMessage;
