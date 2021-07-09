import Fastify from "fastify";
import axios from "axios";
import dotenv from 'dotenv'
dotenv.config({});
// import {} from "dotenv/config";
const server = Fastify({ logger: true });

const searchURL = "https://ma-contentsolutions.atlassian.net/rest/api/2/search";
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

const getProjectsFromJira = async (authToken) => {
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
          Name: response.data.projects[i].name,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return projects;
};

const getJiraTickets = async (authToken, projectID) => {
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
      // TODO: grab fields that we care about from tickets
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// get all projects for a user
server.get("/projects", async (request, reply) => {
  const authToken = createAuthToken(chrisEmail);
  return getProjectsFromJira(authToken);
});

// get open tickets within a project
server.get("/opentickets", async (request, reply) => {
  const authToken = createAuthToken(chrisEmail);
  const openTickets = getJiraTickets(authToken, 13511);
  return { openTickets };
});

// get all tickets for a project
server.get("/alltickets", async (request, reply) => {
  return { hello: "world" };
});

// assign a ticket to the user
server.post("/projects", async (request, reply) => {
  return { hello: "world" };
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
