import { PrdcServerApiClient } from "./Api";

interface App_Props {

}

interface App_State {
	currentMessages: Message[];
	user: CurrentUser;
	apiClient: PrdcServerApiClient;
}

///////////////////////////////////////////////////////////////////////////////////////

interface JiraPerson {
	fullName: string;
}

interface CurrentUser extends JiraPerson {

}

interface JiraTicket {
	project: JiraProject;
	title: string;
	ticketId: string;
	status: string;
	description: string;
	createdTime: Date;
	updatedTime: Date;

	assignee?: JiraPerson;
	pairAssignee?: JiraPerson;

	labels?: string[];
	epicName?: string;
	teamName?: string;
	environment?: string;
}

interface JiraProject {
	id: number;
	key: string;
	name: string;
}

interface Message {
	fromUser: boolean;
	senderName: string;
	timeSent: Date;
	title?: string;
	text: string;
	tickets?: JiraTicket[];
}

///////////////////////////////////////////////////////////////////////////////////////

interface CMessage_Props { 
	message: Message;
	user: CurrentUser;
	apiClient: PrdcServerApiClient;
}

interface CMessage_State { 
	visible: boolean;
}

interface CClaimButton_Props {
	user: CurrentUser;
	ticket: JiraTicket;
	apiClient: PrdcServerApiClient;
	callback_claimed?: () => Promise<void>;
}

enum ClaimState {
	UNCLAIMED, CLAIMED, ERROR
}

interface CClaimButton_State {
	claimed: ClaimState;
	loading: boolean;
	errorMessage?: string;
}

interface CTicketDisplay_Props {
	user: CurrentUser;
	ticket: JiraTicket;
	apiClient: PrdcServerApiClient;
}

interface CTicketDisplay_State {
	visible: boolean;
}


export type {
	CMessage_Props, CMessage_State, JiraPerson, JiraTicket, Message,
	CClaimButton_Props, CClaimButton_State, CTicketDisplay_Props, 
	CTicketDisplay_State, CurrentUser, App_Props, 
	App_State, JiraProject
};

export {
	ClaimState
}
