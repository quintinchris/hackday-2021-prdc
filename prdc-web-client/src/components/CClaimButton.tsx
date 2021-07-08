import { CClaimButton_Props, CClaimButton_State, ClaimState } from "../objects/Data";
import React from "react";
import Button from "react-bootstrap/Button";

class CClaimButton extends React.Component<CClaimButton_Props, CClaimButton_State> {
	state: CClaimButton_State = {
		claimed: ClaimState.UNCLAIMED,
		loading: false
	};

	constructor(props: CClaimButton_Props) {
		super(props);
		this.getButtonVariant.bind(this);
		this.getButtonText.bind(this);
		this.getButtonDisabled.bind(this);
	}

	ticketClaimedByUser(): boolean {
		const assigneeName: string | undefined = this.props.ticket.assignee?.fullName;
		const pairAssigneeName: string | undefined = this.props.ticket.pairAssignee?.fullName;
		const userName: string = this.props.user.fullName;

		if ((assigneeName && assigneeName === userName) || 
			(pairAssigneeName && pairAssigneeName === userName))
			return true;
		else return false;
	}

	getButtonVariant(): string {
		switch (this.state.claimed) {
			case ClaimState.CLAIMED:
				const claimedByUser: boolean = this.ticketClaimedByUser();
				return claimedByUser ? `success` : `secondary`;
			case ClaimState.UNCLAIMED:
				return `primary`;
			case ClaimState.ERROR:
				return `danger`;
			default:
				return `secondary`;
		}
	}

	getButtonText(): string {
		if (this.state.loading)
			return `Loading...`;

		switch (this.state.claimed) {
			case ClaimState.CLAIMED:
				const claimedByUser: boolean = this.ticketClaimedByUser();
				return claimedByUser ? 
					`Claimed by you ✔` : `Already claimed ✘`;
			case ClaimState.UNCLAIMED:
				return `Claim ticket`;
			case ClaimState.ERROR:
				return `Error ✘`;
			default:
				return `Unknown status`;
		}
	}

	getButtonDisabled(): boolean {
		if (this.state.loading) return true;
		else return this.state.claimed === ClaimState.CLAIMED;
	}

	async claimTicket(): Promise<void> {
		this.setState({
			loading: true
		});

		try {
			await this.props.apiClient.claimTicket(this.props.ticket);
			if (this.props.callback_claimed)
				await this.props.callback_claimed();
		} catch (err) {
			console.error(`Error attempting to claim ticket: ${err.message}`)
			console.trace(err);

			this.setState({
				claimed: ClaimState.ERROR,
				loading: false
			});
			return Promise.resolve();
		}

		//promise successful

		this.setState({
			claimed: ClaimState.CLAIMED,
			loading: false
		});
		return Promise.resolve();
	}

	render() {
		return (
			<Button 
				disabled={this.getButtonDisabled()} 
				onClick={async() => await this.claimTicket()}
			>
				{this.getButtonText()}
			</Button>
		)
	}
}

export default CClaimButton;
