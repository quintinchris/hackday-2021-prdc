import { PrdcServerApiClient, ApiResponse_Project, ApiResponse_Ticket } from "../objects/Api";
import { JiraTicket, JiraProject, JiraPerson } from "../objects/Data";
import Axios, { AxiosResponse, AxiosRequestConfig } from "axios";

class RealApiClient implements PrdcServerApiClient {
	serverHostname: string = `localhost`;
	serverPort: number = 3001;
	
	async getProjects(): Promise<JiraProject[]> {
		const respRaw: Object = await this.sendGetRequest(`projects`);
		const resp: ApiResponse_Project[] = (respRaw as ApiResponse_Project[]);

		const projects: JiraProject[] = [];

		resp.forEach((project: ApiResponse_Project) => {
			projects.push({
				id: Number(project.ID),
				key: project.Key,
				name: project.Name
			});
		});

		return Promise.resolve(projects);
	}

	async getUnclaimedTickets(project: JiraProject): Promise<JiraTicket[]> {
		const respRaw: Object = await this.sendGetRequest(`opentickets/${project.key}`);
		const resp: ApiResponse_Ticket[] = (respRaw as ApiResponse_Ticket[]);

		const tickets: JiraTicket[] = [];
		const defaultLabels: string[] = [`UAT`, `Defect`, `WEB`]

		const defaultAssignee: JiraPerson = {
			fullName: `Prasanth Louis`
		};
		const defaultPairAssignee: JiraPerson ={
			fullName: `Rohith Hegde`
		};

		resp.forEach((ticket: ApiResponse_Ticket) => {
			tickets.push({
				project: project,
				ticketId: ticket.ID,
				description: `${ticket.Release} | ${ticket.Status} | ${ticket.Priority} | ${ticket.Type}`,
				status: ``,
				title: ticket.Title,
				labels: defaultLabels,
				// assignee: defaultAssignee,
				// pairAssignee: defaultPairAssignee,
			})
		});

		return Promise.resolve(tickets);
	}

	async getAllTicketsClaimed(project: JiraProject): Promise<JiraTicket[]> {
		const respRaw: Object = await this.sendGetRequest(`alltickets/${project.key}`);
		const resp: ApiResponse_Ticket[] = (respRaw as ApiResponse_Ticket[]);

		const tickets: JiraTicket[] = [];
		const defaultLabels: string[] = [`UAT`, `Defect`, `WEB`]

		const defaultAssignee: JiraPerson = {
			fullName: `Prasanth Louis`
		};
		const defaultPairAssignee: JiraPerson ={
			fullName: `Rohith Hegde`
		};

		resp.forEach((ticket: ApiResponse_Ticket) => {
			tickets.push({
				project: project,
				ticketId: ticket.ID,
				description: `${ticket.Release} | ${ticket.Status} | ${ticket.Priority} | ${ticket.Type}`,
				status: ``,
				title: ticket.Title,
				labels: defaultLabels,
				assignee: defaultAssignee,
				pairAssignee: defaultPairAssignee,
			})
		});

		return Promise.resolve(tickets);
	}

	async getUserTicketsClaimed(project: JiraProject): Promise<JiraTicket[]> {
		throw new Error("Method not implemented.");
	}

	async claimTicket(ticketToClaim: JiraTicket): Promise<void> {
		//const queryParams: string = `userEmail=Rohith.Hegde@moodys.com&ticketId=${ticketToClaim.ticketId}`;
		await this.sendPutRequest(`assign/${`Rohith.Hegde@moodys.com`}/${ticketToClaim.ticketId}`);
	}

	async sendGetRequest(path: string): Promise<Object> {
		const response: AxiosResponse<Object> = await Axios.get<Object>(`http://${this.serverHostname}:${this.serverPort}/${path}`);
		return Promise.resolve(response.data);
	}

	async sendPutRequest(path: string): Promise<void> {
		const resp: any = await Axios.put(`http://${this.serverHostname}:${this.serverPort}/${path}`);
		if (!resp.data.message || !resp.data.message.includes(`Ticket is now assigned to`))
			return Promise.reject(`Error assigning ticket: ${resp}`);
		else
			return Promise.resolve();
	}
}

export default RealApiClient;
