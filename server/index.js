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

const getOpenJiraTickets = async (projectID) => {
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
          Assignee: response.data.issues[i].fields.assignee.displayName,
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

const getUserByEmail = async (userEmail) => {
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
      ticket = assignTicketToUser(user.accountId, 'MDCPT-448');
    })
    .catch((error) => {
      console.log(error);
    });
    console.log(user);
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
server.get("/opentickets", async (request, reply) => {
  return getOpenJiraTickets(13511);
});

// get all tickets for a project
server.get("/alltickets", async (request, reply) => {
  return getAllJiraTickets(13511);
});

// assign a ticket to the user
server.put("/assign", async (request, reply) => {
  return getUserByEmail(chrisEmail);
});

server.get("/user", async (request, reply) => {
  return getUserByEmail(chrisEmail);
});

// Run the server!
const start = async () => {
  try {
    await server.listen(3000);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();