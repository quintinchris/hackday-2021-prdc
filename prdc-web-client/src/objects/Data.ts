
interface JiraPerson {
	fullName: string;
}

interface JiraTicket {
	title: string;
	ticketId: string;
	status: string;
	createdTime: Date;
	updatedTime: Date;

	assignee?: JiraPerson;
	pairAssignee?: JiraPerson;

	labels: string[];
	epicName?: string;
	teamName?: string;
	environment?: string;
}

interface Message {
	fromUser: boolean;
	senderName: string;
	timeSent: Date;
	title?: string;
	messageMarkdown: string;
}

///////////////////////////////////////////////////////////////////////////////////////

interface CMessage_Props { 
	messageContent: Message;
}

interface CMessage_State { 
	visible: boolean;
}

export type {
	CMessage_Props, CMessage_State, JiraPerson, JiraTicket, Message
};
