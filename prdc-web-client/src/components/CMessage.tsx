import { CMessage_State, CMessage_Props, JiraTicket } from "../objects/Data";
import React from 'react';
import Toast from 'react-bootstrap/Toast'
import CTicketDisplay from "./CTicketDisplay";

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

	render() {
		/*{this.props.messageContent.title ? <h4>{this.props.messageContent.title}</h4> : ""}
			<p>{this.props.messageContent.messageMarkdown}</p> */

		return (
			<>
				<Toast show={this.state.visible} onClose={() => this.setVisibility(false)}>
					<Toast.Header>
						<strong className="mr-auto">{this.props.message.senderName}</strong>
						<small>{this.getMessageAgeMins()} min. ago</small>
					</Toast.Header>
					<Toast.Body>
						{
							typeof this.props.message.content === `string` ? 
								<p>{this.props.message.content}</p> :
								(this.props.message.content as JiraTicket[])
									.map((ticket: JiraTicket) => {
										return <CTicketDisplay 
											ticket={ticket} 
											user={this.props.user} 
											apiClient={this.props.apiClient}
										/>;
								})
						}
					</Toast.Body>
				</Toast>
			</>
		);
	}
}

export default CMessage;
