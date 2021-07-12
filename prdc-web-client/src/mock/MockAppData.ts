import { Message, CurrentUser, JiraProject, JiraTicket } from "../objects/Data";

const mockProject: JiraProject = {
	id: 999,
	key: `PRDC`,
	name: `PRDC team hack day`
}

const mockTickets: JiraTicket[] = [
	{
		project: mockProject,
		ticketId: `PRDC-005`,
		title: `Get the web page to work`,
		createdTime: new Date(`2021-07-08T10:45:00Z`),
		status: `In Progress`,
		labels: [`WEB`, `React`, `TS`],
		description: `Fix the front end page`,
		updatedTime: new Date(`2021-07-09T09:30:00Z`),
		assignee: {
			fullName: `Rohith Hegde`
		},
		pairAssignee: {
			fullName: `Prasanth Louis`
		}
	},
	{
		project: mockProject,
		ticketId: `PRDC-003`,
		title: `Get the back end routes to work`,
		createdTime: new Date(`Jul 8, 2021`),
		status: `Closed`,
		description: `Get the five server routes working`,
		updatedTime: new Date(`Jul 9, 2021`),
		teamName: `PRDC Zuri`,
		epicName: `Ticket management system`
	},
	{
		project: mockProject,
		ticketId: `PRDC-004`,
		title: `Very long description`,
		createdTime: new Date(`Jul 8, 2021`),
		status: `Closed`,
		description: `at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque viverra ipsum nunc aliquet bibendum`,
		updatedTime: new Date(`Jul 9, 2021`),
	},
]

const mockMessages: Message[] = [
	{
		title: `Mock text message 1`,
		text: `at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque`,
		fromUser: false,
		senderName: `System`,
		timeSent: new Date(`2021-07-08T19:00:00Z`)
	},
	{
		title: `Mock ticket message 1`,
		text: `Here are some project tickets for you:`,
		tickets: mockTickets,
		fromUser: false,
		senderName: `System`,
		timeSent: new Date(`2021-07-08T22:45:00Z`)
	},
	{
		title: `Mock user message 1`,
		text: `Claimed ticket 'PRDC-003'`,
		fromUser: true,
		senderName: `Rohith Hegde`,
		timeSent: new Date(`2021-07-09T13:00:00Z`)
	},
]

const mockUser: CurrentUser = {
	fullName: `Rohith Hegde`,
	emailAddress: `nil@null.nl`
}

export {
	mockMessages, mockUser, mockProject, mockTickets
};
