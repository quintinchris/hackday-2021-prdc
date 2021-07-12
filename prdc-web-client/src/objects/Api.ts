import { JiraTicket, JiraProject } from "./Data";

interface PrdcServerApiClient {
	serverHostname: string;
	serverPort: number;
	
	getProjects(): Promise<JiraProject[]>;
	getUnclaimedTickets(project: JiraProject): Promise<JiraTicket[]>;
	getAllTicketsClaimed(project: JiraProject): Promise<JiraTicket[]>;
	getUserTicketsClaimed(project: JiraProject): Promise<JiraTicket[]>;
	claimTicket(ticketToClaim: JiraTicket): Promise<void>;
}

interface ApiResponse_Project {
	ID: string;
	Key: string;
	Name: string;
}

interface ApiResponse_Ticket {
	ID: string;
	Title: string;
	Status: string;
	Priority: string;
	Type: string;
	Release: string;
}


export type {
	PrdcServerApiClient, ApiResponse_Project, ApiResponse_Ticket
};
