import { CActions_Props, CActions_State, JiraProject, Message, JiraTicket } from "../objects/Data";
import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class CActions extends React.Component<CActions_Props, CActions_State> {
	state: CActions_State = {
		currentProject: undefined,
		projectChoices: undefined
	}

	async handleGetProjects(): Promise<void> {
		const availProjects: JiraProject[] = await this.props.apiClient.getProjects();

		let projText: string = ``;
		availProjects.forEach(proj => projText += `<b>${proj.key}</b>: ${proj.name}<br/>`)

		const getProjectsMsg: Message = {
			fromUser: true,
			senderName: this.props.user.fullName,
			text: `--> Get available projects`,
			timeSent: new Date(),
			title: `Available Jira projects`,
		}
		this.props.responseCallback(getProjectsMsg);

		const displayProjectsMsg: Message = {
			fromUser: false,
			senderName: `System`,
			text: `Please use the buttons to select a project below: <br/>${projText}`,
			timeSent: new Date(),
			title: `${availProjects.length} Jira projects available`,
		}
		this.props.responseCallback(displayProjectsMsg);
		
		this.setState({
			projectChoices: availProjects
		});

		return Promise.resolve();
	}

	async handleGetTickets(unassignedOnly: boolean): Promise<void> {
		if (!this.state.currentProject)
			return Promise.resolve();

		const availTickets: JiraTicket[] = unassignedOnly ? 
			await this.props.apiClient.getUnclaimedTickets(this.state.currentProject) : 
			await this.props.apiClient.getAllTicketsClaimed(this.state.currentProject);
		
		const getTicketsMsg: Message = {
			fromUser: true,
			senderName: this.props.user.fullName,
			text: `--> Get tickets (unassigned: ${unassignedOnly})`,
			timeSent: new Date(),
			title: `Available Jira tickets`,
		}
		this.props.responseCallback(getTicketsMsg);

		const displayTicketsMsg: Message = {
			fromUser: false,
			senderName: `System`,
			text: `Here are some project tickets for you:`,
			timeSent: new Date(),
			title: `Project tickets`,
			tickets: availTickets
		}
		this.props.responseCallback(displayTicketsMsg);

		return Promise.resolve();
	}

	async handleChooseProject(projectToChoose: JiraProject): Promise<void> {
		this.setState({
			currentProject: projectToChoose,
			projectChoices: undefined
		});
	}

	renderButton_getProjects() {
		return (
			<Button variant="primary" onClick={async() => await this.handleGetProjects()}>Get available projects</Button>
		);		
	}

	renderButton_selectProject(choice: JiraProject) {
		return (
			<Button variant="primary" onClick={async() => await this.handleChooseProject(choice)}>{choice.key}</Button>
		);		
	}

	renderGetTicketButtons() {
		return (
			<>
				<Button variant="info" onClick={async() => await this.handleGetTickets(true)}>Get unassigned tickets</Button>
				<Button variant="secondary" onClick={async() => await this.handleGetTickets(false)}>Get all tickets</Button>
			</>
		);
	}

	renderButtons() {
		if (this.state.projectChoices && !this.state.currentProject) {
			return (
				this.state.projectChoices.map((choice: JiraProject) => {
					return this.renderButton_selectProject(choice);
				})
			);
		}
		else if (this.state.currentProject)
			return this.renderGetTicketButtons();
		else
			return this.renderButton_getProjects();
	}

	//buttons: get projects, <button to choose each project>, 

	render() {
		return (
			<div>
				{this.renderButtons()}
			</div>
		);
	}
}

export default CActions;
