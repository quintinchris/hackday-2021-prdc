import { JiraTicket } from "./Data";

interface PrdcServerApiClient {
	getUnclaimedTickets(): Promise<JiraTicket[]>;
	getTicketsOwned(): Promise<JiraTicket[]>;
	claimTicket(ticketToClaim: JiraTicket): Promise<void>;
}

export type {
	PrdcServerApiClient
};
