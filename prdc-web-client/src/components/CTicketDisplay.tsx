import React from "react";
import { CTicketDisplay_Props, CTicketDisplay_State, CClaimButton_Props, CClaimButton_State } from "../objects/Data";
import CClaimButton from "./CClaimButton";
import Card from "react-bootstrap/Card";
import "../index.css";

const MAX_DESC_LENGTH: number = 100;

class CTicketDisplay extends React.Component<CTicketDisplay_Props, CTicketDisplay_State> {
	state: CTicketDisplay_State = {
		visible: true,
	}

	getIntroText(): string {
		const desc: string = this.props.ticket.description;
		if (desc.length > MAX_DESC_LENGTH)
			return desc.substr(0, MAX_DESC_LENGTH) + `...`;
		else return desc;
	}

	getClaimButtonProps(): CClaimButton_Props {
		return {
			apiClient: this.props.apiClient,
			ticket: this.props.ticket,
			user: this.props.user,
		}
	}

	render() {
		return (
			<Card className="PaddedCard">
				<Card.Body>
					<Card.Title>{this.props.ticket.title}</Card.Title>
					<Card.Subtitle>{this.props.ticket.ticketId}</Card.Subtitle>
					<Card.Text className="PaddedTicketDesc">{this.getIntroText()}</Card.Text>
					<CClaimButton {...this.getClaimButtonProps()}/>
				</Card.Body>
			</Card>
		)
	}
}

export default CTicketDisplay;
