import { JiraTicket } from "./Data";

interface PrdcServerApiClient {
	getProjects(): Promise<JiraProject[]>;
	getUnclaimedTickets(project: JiraProject): Promise<JiraTicket[]>;
	getAllTicketsClaimed(project: JiraProject): Promise<JiraTicket[]>;
	getUserTicketsClaimed(project: JiraProject): Promise<JiraTicket[]>;
	claimTicket(ticketToClaim: JiraTicket): Promise<void>;
}

export type {
	PrdcServerApiClient
};
