import { PrdcServerApiClient } from "../objects/Api";
import { JiraTicket, JiraProject } from "../objects/Data";

class MockApiClient implements PrdcServerApiClient {
	serverHostname: string = `0.0.0.0`;
	serverPort: number = 0;
	
	getProjects(): Promise<JiraProject[]> {
		throw new Error("Method not implemented.");
	}

	getUnclaimedTickets(project: JiraProject): Promise<JiraTicket[]> {
		throw new Error("Method not implemented.");
	}

	getAllTicketsClaimed(project: JiraProject): Promise<JiraTicket[]> {
		throw new Error("Method not implemented.");
	}

	getUserTicketsClaimed(project: JiraProject): Promise<JiraTicket[]> {
		throw new Error("Method not implemented.");
	}

	claimTicket(ticketToClaim: JiraTicket): Promise<void> {
		throw new Error("Method not implemented.");
	}
}

export default MockApiClient;
