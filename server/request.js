const axios = require("axios");
require("dotenv").config();
const searchURL = "https://ma-contentsolutions.atlassian.net/rest/api/2/search";
// const jql = 'resolution%20is%20empty';
// const jiraAPI = `${searchURL}?jql=${jql}`;
const projectsURL =
  "http://ma-contentsolutions.atlassian.net/rest/api/2/issue/createmeta";
const prasanthEmail = "prasanth.louis@moodys.com";
const chrisEmail = "chris.quintin@moodys.com";
const issueFieldsUrl =
  "http://ma-contentsolutions.atlassian.net/rest/api/2/field";

createAuthToken = (email) => {
  let authToken = `Basic ${Buffer.from(
    `${email}:${process.env.API_TOKEN}`
  ).toString("base64")}`;
  //   console.log(authToken);
  return authToken;
};

callJira = async (authToken) => {
  const res = await axios
    .get(jiraAPI, {
      headers: {
        Accept: "application/json",
        Authorization: `${authToken}`,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

getProjectsFromJira = async () => {
  const authToken = createAuthToken(chrisEmail);
  const res = await axios
    .get(projectsURL, {
      headers: {
        Accept: "application/json",
        Authorization: `${authToken}`,
      },
    })
    .then((response) => {
      let projects = [];
      for (let i = 0; i < response.data.projects.length; i++) {
        projects.push({
          ID: response.data.projects[i].id,
          Name: response.data.projects[i].name,
        });
      }
      //   console.log(response.data.projects);
      return projects;
    })
    .catch((error) => {
      console.log(error);
    });
};

getJiraTickets = async (projectID) => {
  const authToken = createAuthToken(chrisEmail);
  const res = await axios
    .get(searchURL, {
      headers: {
        Accept: "application/json",
        Authorization: `${authToken}`,
      },
      params: {
        jql: "project = " + projectID + " AND assignee is EMPTY AND statusCategory != 4 AND statusCategory != 3 AND type != Subtask AND type != Sub-task AND type != Epic ORDER BY fixVersion DESC, priority DESC",
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};


// prompt user to select a project
// get user response


export default { getProjectsFromJira, getJiraTickets };