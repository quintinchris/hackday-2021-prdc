import React from "react";
import { CTicketDisplay_Props, CTicketDisplay_State, CClaimButton_Props, CClaimButton_State } from "../objects/Data";
import CClaimButton from "./CClaimButton";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import * as Icons from "react-bootstrap-icons";
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

	getAssigneeDiv() {
		return (
			<div>
				{this.props.ticket.assignee ? 
					<span className="AssigneeSpan">
						<Icons.PersonCheckFill/>
						<span className="AssigneeName">{this.props.ticket.assignee.fullName}</span>
					</span>
				 : ``}
				 {this.props.ticket.pairAssignee ? 
					<span className="AssigneeSpan">
						<Icons.PeopleFill/>
						<span className="AssigneeName">{this.props.ticket.pairAssignee.fullName}</span>
					</span>
				 : ``}
			</div>
		)
	}

	render() {
		return (
			<Card className="PaddedCard">
				<Card.Body>
					<Card.Title>{this.props.ticket.title}</Card.Title>
					<Card.Subtitle>{this.props.ticket.ticketId}</Card.Subtitle>
					{this.getAssigneeDiv()}
					<Card.Text className="PaddedTicketDesc">{this.getIntroText()}</Card.Text>
					{
						this.props.ticket.labels ? this.props.ticket.labels.map((label: string) => {
							return (<Badge variant="warning">{label}</Badge>)
						}) : ``
					}
					<CClaimButton {...this.getClaimButtonProps()}/>
				</Card.Body>
			</Card>
		)
	}
}

export default CTicketDisplay;
