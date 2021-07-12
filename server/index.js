import Fastify from "fastify";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config({});
const server = Fastify({ logger: true });

const searchURL = "https://ma-contentsolutions.atlassian.net/rest/api/2/search";
const userSearchURL = "https://ma-contentsolutions.atlassian.net/rest/api/2/user/search";
const projectsURL =
  "https://ma-contentsolutions.atlassian.net/rest/api/2/issue/createmeta";
// const prasanthEmail = "prasanth.louis@moodys.com";
const chrisEmail = "chris.quintin@moodys.com";

const createAuthToken = (email) => {
  let authToken = `Basic ${Buffer.from(
    `${email}:${process.env.API_TOKEN}`
  ).toString("base64")}`;
  return authToken;
};

const getProjectsFromJira = async () => {
  const authToken = createAuthToken(chrisEmail);
  let projects = [];
  const res = await axios
    .get(projectsURL, {
      headers: {
        Accept: "application/json",
        Authorization: `${authToken}`,
      },
    })
    .then((response) => {
      for (let i = 0; i < response.data.projects.length; i++) {
        projects.push({
          ID: response.data.projects[i].id,
          Key: response.data.projects[i].key,
          Name: response.data.projects[i].name,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return projects;
};

const getOpenJiraTickets = async (projectKey) => {
  const authToken = createAuthToken(chrisEmail);
  let tickets = [];
  const res = await axios
    .get(searchURL, {
      headers: {
        Accept: "application/json",
        Authorization: `${authToken}`,
      },
      params: {
        jql:
          "project = " +
          projectKey +
          " AND assignee is EMPTY AND statusCategory != 4 AND statusCategory != 3 AND type != Subtask AND type != Sub-task AND type != Epic ORDER BY fixVersion DESC, priority DESC",
      },
    })
    .then((response) => {
      for (let i = 0; i < response.data.issues.length; i++) {
        tickets.push({
          ID: response.data.issues[i].key,
          Title: response.data.issues[i].fields.summary,
          // Description: response.data.issues[i].fields.description,
          Status: response.data.issues[i].fields.status.name,
          Priority: response.data.issues[i].fields.priority.name,
          Type: response.data.issues[i].fields.issuetype.name,
          Release: response.data.issues[i].fields.fixVersions.name,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(tickets);
  return tickets;
};

const getAllJiraTickets = async (projectID) => {
  const authToken = createAuthToken(chrisEmail);
  let tickets = [];
  const res = await axios
    .get(searchURL, {
      headers: {
        Accept: "application/json",
        Authorization: `${authToken}`,
      },
      params: {
        jql:
          "project = " +
          projectID +
          " AND statusCategory != 3 AND type != Subtask AND type != Sub-task AND type != Epic ORDER BY fixVersion DESC, priority DESC",
      },
    })
    .then((response) => {
      for (let i = 0; i < response.data.issues.length; i++) {
        tickets.push({
          ID: response.data.issues[i].key,
          Title: response.data.issues[i].fields.summary,
          // Description: response.data.issues[i].fields.description,
          Assignee: response.data.issues[i].fields.assignee ? response.data.issues[i].fields.assignee.displayName : null,
          Status: response.data.issues[i].fields.status.name,
          Priority: response.data.issues[i].fields.priority.name,
          Type: response.data.issues[i].fields.issuetype.name,
          Release: response.data.issues[i].fields.fixVersions.name,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(tickets);
  return tickets;
};

const getUserbyEmail = async (userEmail, ticketId) => {
  const authToken = createAuthToken(chrisEmail);
  let user = {};
  const res = await axios
    .get(searchURL, {
      headers: {
        Accept: "application/json",
        Authorization: `${authToken}`,
      },
      params: {
        jql:
          "assignee = " + `"${userEmail.toString()}"`,
      }, 
    })
    .then((response) => {
      user.accountId = response.data.issues[0].fields.assignee.accountId;
      user.name = response.data.issues[0].fields.assignee.displayName;
    })
    .catch((error) => {
      console.log(error);
    });
    return user;
};

const getUserAndAssignTicket = async (userEmail, ticketId) => {
  const authToken = createAuthToken(chrisEmail);
  let user = {};
  let ticket;
  const res = await axios
    .get(searchURL, {
      headers: {
        Accept: "application/json",
        Authorization: `${authToken}`,
      },
      params: {
        jql:
          "assignee = " + `"${userEmail.toString()}"`,
      }, 
    })
    .then((response) => {
      user.accountId = response.data.issues[0].fields.assignee.accountId;
      user.name = response.data.issues[0].fields.assignee.displayName;
      ticket = assignTicketToUser(user.accountId, ticketId);
    })
    .catch((error) => {
      console.log(error);
    });
    user.message = `Ticket is now assigned to ${user.name}`;
    return user;
};

const assignTicketToUser = async (accountId, ticketID) => {
  const assignTicketURL = `https://ma-contentsolutions.atlassian.net/rest/api/2/issue/${ticketID}/assignee`;
  const authToken = createAuthToken(chrisEmail);
  const bodyData = `{
    "accountId": "${accountId}"
  }`;
  const res = await axios
    .put(assignTicketURL, bodyData, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `${authToken}`,
        'Content-Type': 'application/json'
      },
      json: true
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// get all projects for a user
server.get("/projects", async (request, reply) => {
  return getProjectsFromJira();
});

// get open tickets within a project
server.get("/opentickets/:projectKey", async (request, reply) => {
  return getOpenJiraTickets(request.params.projectKey);
});

// get all tickets for a project
server.get("/alltickets/:projectKey", async (request, reply) => {
  return getAllJiraTickets(request.params.projectKey);
});

// get a user by email
server.get("/user:/userEmail", async (request, reply) => {
  return getUserbyEmail(request.params.userEmail);
});

// assign a ticket to the user
server.put("/assign/:userEmail/:ticketId", async (request, reply) => {
  return getUserAndAssignTicket(request.params.userEmail, request.params.ticketId);
});

// Run the server!
const start = async () => {
  try {
    await server.listen(3001);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();