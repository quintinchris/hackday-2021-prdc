import { CMessage_State, CMessage_Props } from "../objects/Data";
import React from 'react';
import Toast from 'react-bootstrap/Toast'

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
		const sentTimeMs: number = this.props.messageContent.timeSent.getTime();

		const diffMin: number = Math.round((currTimeMs - sentTimeMs) / (1000 * 60));
		return diffMin;
	}

	render() {
		return (
			<>
				<Toast show={this.state.visible} onClose={() => this.setVisibility(false)}>
					<Toast.Header>
						<strong className="mr-auto">{this.props.messageContent.senderName}</strong>
						<small>{this.getMessageAgeMins()} min. ago</small>
					</Toast.Header>
					<Toast.Body>
						{this.props.messageContent.title ? <h4>{this.props.messageContent.title}</h4> : ""}
						<p>{this.props.messageContent.messageMarkdown}</p>
					</Toast.Body>
				</Toast>
			</>
		);
	}
}

export default CMessage;
